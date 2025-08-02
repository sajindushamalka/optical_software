const express = require('express');
const optMedDeatils = require('../controllers/OptMedDetails.js');

const router = express.Router();

router.get('/',optMedDeatils.getAllOptMedDeatils);
router.get('/:id',optMedDeatils.getOptMedDeatilsByID);
router.post('/',optMedDeatils.createOptMedDeatils);
router.post('/unpiiore',optMedDeatils.createOptMedUNPIIOREDeatils);
router.post('/second',optMedDeatils.createOptMedSecondDeatils);
router.post('/more',optMedDeatils.createOptMedMore);
router.post('/objective',optMedDeatils.createOptMedobjective);
router.post('/remark',optMedDeatils.createOptMedRemark);
router.post('/contact',optMedDeatils.createOptMedContactLen);
router.put('/:id',optMedDeatils.updateOptMedDeatils);
router.delete('/:id',optMedDeatils.deleteOptMedDeatils);
router.post('/history',optMedDeatils.getOptCushistoryCon);
router.post('/history/sec',optMedDeatils.getOptCushistorySecCon);
router.post('/history/thi',optMedDeatils.getOptCushistoryThirdCon);
router.post('/history/obj',optMedDeatils.getOptCushistoryObjectiveCon);
router.post('/history/obj/remark',optMedDeatils.getOptCushistoryObjectiveRemarkCon);
router.post('/history/con',optMedDeatils.getOptCushistoryCOntactCon);
router.post('/history/more',optMedDeatils.getOptCushistoryMoreCon);

module.exports = router;