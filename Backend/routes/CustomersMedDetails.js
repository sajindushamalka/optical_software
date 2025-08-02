const express = require('express');
const customerMedDeatilsController = require('../controllers/CustomerMedDetails.js');

const router = express.Router();

router.get('/all',customerMedDeatilsController.getAllCustomersMedDetails);
router.get('/:id',customerMedDeatilsController.getCustomersMedDetailsByID);
router.post('/',customerMedDeatilsController.createCustomersMedDetails);
router.put('/:id',customerMedDeatilsController.updateCustomersMedDetails);
router.put('/cashier/:id',customerMedDeatilsController.updateCashierOrderCon);
router.put('/cashier/finish/:id',customerMedDeatilsController.updateandcomplateorderCon);
router.put('/status/:id',customerMedDeatilsController.updateCustomersMedDetailsStatus);
router.put('/assistance/status/:id',customerMedDeatilsController.updateOrderStatusToCashierCon);
router.delete('/:id',customerMedDeatilsController.deleteCustomersMedDetails);
router.get('/optometrist/order',customerMedDeatilsController.getAllOptomestricMedDetails);
router.get('/assistance/invoice',customerMedDeatilsController.getAllAssistanceInvoiceMedDetails);
router.post('/assistance/rx',customerMedDeatilsController.getAllAssistanceInvoicesMedicalDeatilsForRXCon);
router.post('/assistance/rx/second',customerMedDeatilsController.getAllAssistanceInvoicesMedicalDeatilsSecondRxCon);
router.post('/assistance/unpiiore',customerMedDeatilsController.getAllAssistanceInvoicesMedicalDeatilsUnPiIoReadingCon);
router.post('/assistance/more',customerMedDeatilsController.getAllAssistanceInvoicesMedicalDeatilsMoreCon);
router.post('/assistance/obj',customerMedDeatilsController.getAllAssistanceInvoicesMedicalDeatilsObjectiveCon);
router.post('/assistance/con',customerMedDeatilsController.getAllAssistanceInvoicesMedicalDeatilsContactLenCon);
router.post('/assistance/remarks',customerMedDeatilsController.getAllAssistanceInvoicesMedicalDeatilsRemarksCon);
router.get('/cashier/invoice',customerMedDeatilsController.getAllCashierInvoiceMedDetails);
router.get('/history/:id',customerMedDeatilsController.getCustomersHistory);


module.exports = router;