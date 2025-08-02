const express = require('express');
const CashierController = require('../controllers/Cashier.js');

const router = express.Router();

router.get('/',CashierController.getAllCustomers);
router.get('/finished',CashierController.getAllFinishedOrdersCon);
router.get('/:id',CashierController.getCustomerByID);
router.post('/',CashierController.createCustomer);
router.put('/:id',CashierController.updateCustomer);
router.delete('/:id',CashierController.deleteCustomer);

module.exports = router;