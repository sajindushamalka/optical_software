const express = require('express');

const NewCustomersMedDeatilsController = require('../controllers/NewCustomerReport.js');

const router = express.Router();


router.put('/cashier/:id', NewCustomersMedDeatilsController.updateStatusCashierStatusCon);
router.put('/cashier/advance/:id', NewCustomersMedDeatilsController.updateStatusCashierStatusAdvanceCon);
router.put('/assitacnce/:id', NewCustomersMedDeatilsController.updateAssistanceDetilsCon);
router.put('/customer/:id', NewCustomersMedDeatilsController.updateCustomeDetailsCon);
router.put('/factory/:id', NewCustomersMedDeatilsController.updateStatusTOfactoryCon);
router.put('/factory/process/:id', NewCustomersMedDeatilsController.updateStatusfactoryProceesingCon);
router.put('/finished/:id', NewCustomersMedDeatilsController.finishOrderCon);
router.put('/factory/msg/:id', NewCustomersMedDeatilsController.updateStatusfactorytextCon);
router.put('/jobstatus/:id', NewCustomersMedDeatilsController.updateJobStatusCon);
router.get("/cahsierhi", NewCustomersMedDeatilsController.getCustomerRecForCashierCon);
router.get("/complate", NewCustomersMedDeatilsController.getCustomerRecForComplateCon);
router.get("/advance", NewCustomersMedDeatilsController.getAdvancepayamentOnlyCon);
router.post('/', NewCustomersMedDeatilsController.createCustomersMedDetails);
router.post('/new/cahser', NewCustomersMedDeatilsController.createCashierInvoiceCon);
router.post('/new/cahser/items', NewCustomersMedDeatilsController.createCashierInvoiceTableItemsCon);
router.get('/:id', NewCustomersMedDeatilsController.getCustomerOldRecordsCon);
router.get('/objective/:id', NewCustomersMedDeatilsController.getByCMDIdObjCon);
router.get('/conatct/:id', NewCustomersMedDeatilsController.getByCMDIdContactLensesCon);
router.get('/submit/:id', NewCustomersMedDeatilsController.getByCMDIdCon);
router.get('/', NewCustomersMedDeatilsController.getAllCustomersTodayDetails);
router.post('/new', NewCustomersMedDeatilsController.optimizer_create_con);
router.post('/new/objective', NewCustomersMedDeatilsController.optimizer_objective_create_con);
router.post('/new/contact', NewCustomersMedDeatilsController.optimizer_contact_lenses_create_con);
router.put('/:id', NewCustomersMedDeatilsController.updateStatusOptimizerCon);
router.get("/user/:id", NewCustomersMedDeatilsController.getUserFiles);
router.get("/:fileId", NewCustomersMedDeatilsController.getFileById);
router.get("/assitance/process", NewCustomersMedDeatilsController.getCustomerRecForAssistanceCon);
router.get("/assitance/subjective/:id", NewCustomersMedDeatilsController.getByIDWithOptimisticFilledCon);
router.get("/assitance/objective/:id", NewCustomersMedDeatilsController.getByIDWithOptimisticObjectiveFilledCon);
router.get("/assitance/contact/:id", NewCustomersMedDeatilsController.getByIDWithOptimisticContactLensesFilledCon);
router.post("/assitance/second", NewCustomersMedDeatilsController.createAssistanceSecondCon);
router.get("/assitance/second/:id", NewCustomersMedDeatilsController.getBycreateAssistanceSecondCon);
router.put("/assitance/update/:id", NewCustomersMedDeatilsController.updateStatusAssistacnceSecondCon);
router.get("/all/optimistric", NewCustomersMedDeatilsController.getAllOptimsitricRecordsCon);
router.get("/all/broken", NewCustomersMedDeatilsController.getBrokenOrdersCon);
router.post("/upload/files", NewCustomersMedDeatilsController.getUploadedFilesNameOnlyCon);
router.get("/assitance/prescription", NewCustomersMedDeatilsController.getCustomerRecForPrescriptionCon);
router.get("/assitance/factory", NewCustomersMedDeatilsController.getCustomerFactoryDetailsCon);
router.get("/assitance/job", NewCustomersMedDeatilsController.getJobStatusDeatilsCon);
router.post("/cashier/recipt", NewCustomersMedDeatilsController.createCashierInvoiceReciptCon);
router.get("/cashier/recipt/:id", NewCustomersMedDeatilsController.getPartialPaymentAmountCon);
router.get("/admin/invoices", NewCustomersMedDeatilsController.getInvoiceReportCon);
router.get("/admin/recepits", NewCustomersMedDeatilsController.getInvoiceRecepitCon);
router.post("/cashier/invoice", NewCustomersMedDeatilsController.getInvoiceByIDCon);
router.post("/cashier/recepit", NewCustomersMedDeatilsController.getRecepitByIDCon);
router.post("/cashier/customer", NewCustomersMedDeatilsController.getCusomtwrByIDCon);
router.post("/cashier/invoice/table", NewCustomersMedDeatilsController.getInvoiceTableByIDCon);
router.post("/cashier/jobid", NewCustomersMedDeatilsController.getJobByIDCon);
router.post("/factory/reorder", NewCustomersMedDeatilsController.createReorderMessageCon);
router.put("/report/update/:id", NewCustomersMedDeatilsController.updateOptimisticDeatilsCon);
router.put("/report/update/object/:id", NewCustomersMedDeatilsController.updateOptimisticObjectiveDeatilsCon);
router.put("/report/update/contact/:id", NewCustomersMedDeatilsController.updateOptimisticCOntactDeatilsCon);


module.exports = router;