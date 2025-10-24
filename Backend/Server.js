const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path")
const multer = require("multer");
dotenv.config();
const db = require("./db/DB_Config.js");

const userRouters = require("./routes/User.js");
const customerRouters = require("./routes/Customers.js");
const customerMedDeatilsRouters = require("./routes/CustomersMedDetails.js");
const customerMedDeatilsRxRouters = require("./routes/CustomersMedDetailsRx.js");
const optMedDeatilsRouters = require("./routes/OptMedDetails.js");
const sendEmailRouter = require("./routes/SendEmail.js");
const cashierRouter = require("./routes/Cashier.js");
const newCusOrder = require("./routes/NewCustomerReport.js");
const rootAmin = require("./routes/RootAdmin.js");
const whatsappMessages = require("./routes/whatsappRoutes.js");

const app = express();
const PORT = process.env.PORT || 2677;

app.use(cors());
app.use(bodyParser.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRouters);
app.use("/api/customer", customerRouters);
app.use("/api/customer/med", customerMedDeatilsRouters);
app.use("/api/customer/med/rx", customerMedDeatilsRxRouters);
app.use("/api/opt/med", optMedDeatilsRouters);
app.use("/api/email", sendEmailRouter);
app.use("/api/cahsier", cashierRouter);
app.use("/api/order", newCusOrder);
app.use("/api/root", rootAmin);
app.use("/api/whatsapp", whatsappMessages);

const httpServer = http.createServer(app);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // files will be saved in "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

const upload = multer({ storage: storage });

// // Upload route
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.send({ message: "File uploaded successfully", file: req.file });
// });


// --- Upload route ---
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    // req.file contains file info
    // req.body contains your other params
    const { cid, cmd_id, type, file_name, upload_date } = req.body;
    const savedFileName = req.file.filename; // actual saved filename on server

    const sql = `
      INSERT INTO optical_software.customer_files (cid, cmd_id, type, file_name, upload_date)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [cid, cmd_id, type, file_name, upload_date],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: "Database insert failed" });
        }
        res.send({ message: "File uploaded and saved to DB successfully!" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Upload failed" });
  }
});


httpServer.listen(PORT, () => {
  console.log("-------------------------------------");
  console.log(`---Backend is running on port ${PORT}---`);
});
