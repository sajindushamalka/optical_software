const express = require('express');

const RootAdminCOntroller = require('../controllers/RootAdmin.js');

const router = express.Router();

router.get('/purposeov', RootAdminCOntroller.getAllPurposeofVisit);
router.post('/purposeov', RootAdminCOntroller.createPurposeofVisit);
router.put('/purposeov/:id', RootAdminCOntroller.updatePurposeofVisit);
router.delete('/purposeov/:id', RootAdminCOntroller.deletePurposeofVisit);

router.get('/general', RootAdminCOntroller.getAllGeneralHealthCon);
router.post('/general', RootAdminCOntroller.createGeneralHealthCon);
router.put('/general/:id', RootAdminCOntroller.updateGeneralHealthCon);
router.delete('/general/:id', RootAdminCOntroller.deleteGeneralHealthCon);

router.get('/symptoms', RootAdminCOntroller.getAllsymptomsCon);
router.post('/symptoms', RootAdminCOntroller.createsymptomsCOn);
router.put('/symptoms/:id', RootAdminCOntroller.updatesymptomsCOn);
router.delete('/symptoms/:id', RootAdminCOntroller.deletesymptomsCon);

router.get('/occular', RootAdminCOntroller.getAlloccular_healthCon);
router.post('/occular', RootAdminCOntroller.createoccular_healthCon);
router.put('/occular/:id', RootAdminCOntroller.updateoccular_healthCon);
router.delete('/occular/:id', RootAdminCOntroller.deleteoccular_healthCon);

router.get('/typeoflense', RootAdminCOntroller.getAlltype_of_lenseCon);
router.post('/typeoflense', RootAdminCOntroller.createtype_of_lenseCon);
router.put('/typeoflense/:id', RootAdminCOntroller.updatetype_of_lenseCon);
router.delete('/typeoflense/:id', RootAdminCOntroller.deletetype_of_lenseCon);

router.get('/lense', RootAdminCOntroller.getAlllens_materialCon);
router.post('/lense', RootAdminCOntroller.createlens_materialCon);
router.put('/lense/:id', RootAdminCOntroller.updatelens_materialCon);
router.delete('/lense/:id', RootAdminCOntroller.deletelens_materialCon);

router.get('/lense/type', RootAdminCOntroller.getAlllenses_typeCon);
router.post('/lense/type', RootAdminCOntroller.createlenses_typeCon);
router.put('/lense/type/:id', RootAdminCOntroller.updatelenses_typeCon);
router.delete('/lense/type/:id', RootAdminCOntroller.deletelenses_typeCon);

router.get('/lense/treatment', RootAdminCOntroller.getAlllens_treatmentCon);
router.post('/lense/treatment', RootAdminCOntroller.createlens_treatmentCon);
router.put('/lense/treatment/:id', RootAdminCOntroller.updatelens_treatmentCon);
router.delete('/lense/treatment/:id', RootAdminCOntroller.deletelens_treatmentCon);

router.get('/lense/colour', RootAdminCOntroller.getAlllens_colourCon);
router.post('/lense/colour', RootAdminCOntroller.createlens_colourCon);
router.put('/lense/colour/:id', RootAdminCOntroller.updatelens_colourCon);
router.delete('/lense/colour/:id', RootAdminCOntroller.deletelens_colourCon);

router.get('/lense/size', RootAdminCOntroller.getAlllens_sizeCon);
router.post('/lense/size', RootAdminCOntroller.createlens_sizeCon);
router.put('/lense/size/:id', RootAdminCOntroller.updatelens_sizeCon);
router.delete('/lense/size/:id', RootAdminCOntroller.deletelens_sizeCon);

router.get('/lense/base', RootAdminCOntroller.getAlllens_baseCon);
router.post('/lense/base', RootAdminCOntroller.createlens_baseCon);
router.put('/lense/base/:id', RootAdminCOntroller.updatelens_baseCon);
router.delete('/lense/base/:id', RootAdminCOntroller.deletelens_baseCon);

router.get('/lense/brand', RootAdminCOntroller.getAlllens_brandCon);
router.post('/lense/brand', RootAdminCOntroller.createlens_brandCon);
router.put('/lense/brand/:id', RootAdminCOntroller.updatelens_brandCon);
router.delete('/lense/brand/:id', RootAdminCOntroller.deletelens_brandCon);

router.get('/lense/at', RootAdminCOntroller.getAlllenses_atCon);
router.post('/lense/at', RootAdminCOntroller.createlenses_atCon);
router.put('/lense/at/:id', RootAdminCOntroller.updatelenses_atCon);
router.delete('/lense/at/:id', RootAdminCOntroller.deletelenses_atCon);

router.get('/frame/category', RootAdminCOntroller.getAllframe_categoryCon);
router.post('/frame/category', RootAdminCOntroller.createframe_categoryCon);
router.put('/frame/category/:id', RootAdminCOntroller.updateframe_categoryCon);
router.delete('/frame/category/:id', RootAdminCOntroller.deleteframe_categoryCon);

router.get('/frame/material', RootAdminCOntroller.getAllframe_materialCon);
router.post('/frame/material', RootAdminCOntroller.createframe_materialCon);
router.put('/frame/material/:id', RootAdminCOntroller.updateframe_materialCon);
router.delete('/frame/material/:id', RootAdminCOntroller.deleteframe_materialCon);

router.get('/frame/type', RootAdminCOntroller.getAllframe_typeCon);
router.post('/frame/type', RootAdminCOntroller.createframe_typeCon);
router.put('/frame/type/:id', RootAdminCOntroller.updateframe_typeCon);
router.delete('/frame/type/:id', RootAdminCOntroller.deleteframe_typeCon);

router.get('/frame/color', RootAdminCOntroller.getAllframe_colorCon);
router.post('/frame/color', RootAdminCOntroller.createframe_colorCon);
router.put('/frame/color/:id', RootAdminCOntroller.updateframe_colorCon);
router.delete('/frame/color/:id', RootAdminCOntroller.deleteframe_colorCon);

router.get('/doctor', RootAdminCOntroller.getAlldoctor_rxCon);
router.post('/doctor', RootAdminCOntroller.createdoctor_rxCon);
router.put('/doctor/:id', RootAdminCOntroller.updatedoctor_rxCon);
router.delete('/doctor/:id', RootAdminCOntroller.deletedoctor_rxCon);

router.get('/test', RootAdminCOntroller.getAlltested_byCon);
router.post('/test', RootAdminCOntroller.createtested_byCon);
router.put('/test/:id', RootAdminCOntroller.updatetested_byCon);
router.delete('/test/:id', RootAdminCOntroller.deletetested_byCon);

router.get('/enter', RootAdminCOntroller.getAllentered_byCon);
router.post('/enter', RootAdminCOntroller.createentered_byCon);
router.put('/enter/:id', RootAdminCOntroller.updateentered_byCon);
router.delete('/enter/:id', RootAdminCOntroller.deleteentered_byCon);

router.get('/user', RootAdminCOntroller.getAllusersCon);
router.post('/user', RootAdminCOntroller.createusersCon);
router.put('/user/:id', RootAdminCOntroller.updateusersCon);
router.delete('/user/:id', RootAdminCOntroller.deleteusersCon);

router.get('/invoice', RootAdminCOntroller.getAllcashier_invoice_detailsCon);
router.post('/invoice', RootAdminCOntroller.createcashier_invoice_detailsCon);
router.put('/invoice/:id', RootAdminCOntroller.updatecashier_invoice_detailsCon);
router.delete('/invoice/:id', RootAdminCOntroller.deletecashier_invoice_detailsCon);

router.get('/complate/:id', RootAdminCOntroller.getchasiercomplateinvoicetableCon);
router.put('/cashier/:id', RootAdminCOntroller.updatecashier_invoiceTable_detailsCon);
router.put('/cashier/date/:id', RootAdminCOntroller.updatecashier_invoice_date_detailsCon);

module.exports = router;