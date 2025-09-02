const express = require('express');

const NewCustomersMedDeatilsController = require('../controllers/NewCustomerReport.js');

const router = express.Router();


router.put('/cashier/:id',NewCustomersMedDeatilsController.updateStatusCashierStatusCon);
router.get("/cahsierhi", NewCustomersMedDeatilsController.getCustomerRecForCashierCon);
router.get("/complate", NewCustomersMedDeatilsController.getCustomerRecForComplateCon);
router.post('/',NewCustomersMedDeatilsController.createCustomersMedDetails);
router.post('/new/cahser',NewCustomersMedDeatilsController.createCashierInvoiceCon);
router.post('/new/cahser/items',NewCustomersMedDeatilsController.createCashierInvoiceTableItemsCon);
router.get('/:id',NewCustomersMedDeatilsController.getCustomerOldRecordsCon);
router.get('/objective/:id',NewCustomersMedDeatilsController.getByCMDIdObjCon);
router.get('/conatct/:id',NewCustomersMedDeatilsController.getByCMDIdContactLensesCon);
router.get('/submit/:id',NewCustomersMedDeatilsController.getByCMDIdCon);
router.get('/',NewCustomersMedDeatilsController.getAllCustomersTodayDetails);
router.post('/new',NewCustomersMedDeatilsController.optimizer_create_con);
router.post('/new/objective',NewCustomersMedDeatilsController.optimizer_objective_create_con);
router.post('/new/contact',NewCustomersMedDeatilsController.optimizer_contact_lenses_create_con);
router.put('/:id',NewCustomersMedDeatilsController.updateStatusOptimizerCon);
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


module.exports = router;