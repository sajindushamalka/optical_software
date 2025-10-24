const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_NUMBER_ID;

// helper: upload file to WhatsApp to get media_id
async function uploadToWhatsApp(filePath, filename, mimeType) {
  const url = `https://graph.facebook.com/v20.0/${PHONE_ID}/media`;
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath), { filename });
  form.append('messaging_product', 'whatsapp');
  form.append('type', mimeType); // e.g. 'application/pdf'

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    ...form.getHeaders()
  };

  const resp = await axios.post(url, form, { headers });
  return resp.data.id || resp.data; // media id location depends on version
}

// helper: send document message using media_id
async function sendDocumentMessage(toPhoneNumber, mediaId, caption) {
  const url = `https://graph.facebook.com/v20.0/${PHONE_ID}/messages`;
  const body = {
    messaging_product: "whatsapp",
    to: toPhoneNumber,
    type: "document",
    document: {
      id: mediaId,
      caption: caption || ''
    }
  };

  const resp = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }
  });
  return resp.data;
}

exports.uploadAndSendPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // 1) upload file to WhatsApp to get media_id
    const filePath = req.file.path;
    const mimeType = req.file.mimetype || 'application/pdf';
    const filename = req.file.originalname;

    const uploadResult = await uploadToWhatsApp(filePath, filename, mimeType);
    // uploadResult typically has { id: 'MEDIA_ID', ... }
    const mediaId = uploadResult.id || uploadResult.media_id || uploadResult;

    // 2) send message to recipient (pass recipient phone in body)
    const { to, caption } = req.body; // 'to' in international format e.g. 9477xxxxxxx
    if (!to) return res.status(400).json({ error: 'Recipient phone number required in body (to)' });

    const sendResp = await sendDocumentMessage(to, mediaId, caption);

    // cleanup file
    fs.unlink(filePath, () => {});

    return res.json({ uploadResult, sendResp });
  } catch (err) {
    console.error(err.response?.data || err.message || err);
    return res.status(500).json({ error: 'Failed', detail: err.response?.data || err.message });
  }
};
