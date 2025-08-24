const express = require('express');
const multer = require("multer");

const NewCustomersMedDeatilsController = require('../controllers/NewCustomerReport.js');

const router = express.Router();
// configure multer (store files in memory for DB)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/',NewCustomersMedDeatilsController.createCustomersMedDetails);
router.get('/:id',NewCustomersMedDeatilsController.getCustomerOldRecordsCon);
router.get('/objective/:id',NewCustomersMedDeatilsController.getByCMDIdObjCon);
router.get('/conatct/:id',NewCustomersMedDeatilsController.getByCMDIdContactLensesCon);
router.get('/submit/:id',NewCustomersMedDeatilsController.getByCMDIdCon);
router.get('/',NewCustomersMedDeatilsController.getAllCustomersTodayDetails);
router.post('/new',NewCustomersMedDeatilsController.optimizer_create_con);
router.post('/new/objective',NewCustomersMedDeatilsController.optimizer_objective_create_con);
router.post('/new/contact',NewCustomersMedDeatilsController.optimizer_contact_lenses_create_con);
router.put('/:id',NewCustomersMedDeatilsController.updateStatusOptimizerCon);
router.post(
  "/upload",
  upload.array("files", 10), // max 10 files at once
  NewCustomersMedDeatilsController.uploadFiles
);
router.get("/user/:id", NewCustomersMedDeatilsController.getUserFiles);
router.get("/:fileId", NewCustomersMedDeatilsController.getFileById);
router.get("/assitance/process", NewCustomersMedDeatilsController.getCustomerRecForAssistanceCon);
router.get("/assitance/subjective/:id", NewCustomersMedDeatilsController.getByIDWithOptimisticFilledCon);
router.get("/assitance/objective/:id", NewCustomersMedDeatilsController.getByIDWithOptimisticObjectiveFilledCon);
router.get("/assitance/contact/:id", NewCustomersMedDeatilsController.getByIDWithOptimisticContactLensesFilledCon);
router.post("/assitance/second", NewCustomersMedDeatilsController.createAssistanceSecondCon);
router.get("/assitance/second/:id", NewCustomersMedDeatilsController.getBycreateAssistanceSecondCon);
router.put("/assitance/update/:id", NewCustomersMedDeatilsController.updateStatusAssistacnceSecondCon);


module.exports = router;