const express = require('express');
const customerMedDeatilsRxController = require('../controllers/CustomerMedDetailsRx.js');

const router = express.Router();

router.get('/',customerMedDeatilsRxController.getAllCustomersMedDetailsRx);
router.get('/:id',customerMedDeatilsRxController.getCustomersMedDetailsRxByID);
router.post('/',customerMedDeatilsRxController.createCustomersMedDetailsRx);
router.post('/history',customerMedDeatilsRxController.getCustomerHistoryRXCon);
router.put('/:id',customerMedDeatilsRxController.updateCustomersMedDetailsRx);
router.delete('/:id',customerMedDeatilsRxController.deleteCustomersMedDetailsRx);
router.post('/selected',customerMedDeatilsRxController.getCustomersMedDetailsRxBySpecialID);

module.exports = router;