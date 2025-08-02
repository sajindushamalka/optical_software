const CustomersMedDetails = require("../models/CustomerMedDetails.js");

exports.getAllCustomersMedDetails = (req,res) => {
    console.log('come')
    CustomersMedDetails.getAll((err,result) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
}

exports.getCustomersMedDetailsByID = (req,res) => {
    const {id} = req.params;
    CustomersMedDetails.getById(id, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result[0]);
    })
}

exports.createCustomersMedDetails = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    CustomersMedDetails.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateCustomersMedDetails = (req,res) => {
    const {id} = req.params;
    const updateU = req.body;

    CustomersMedDetails.update(id,updateU,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json(this.updateU)
    })
}

exports.deleteCustomersMedDetails = (req,res) => {
    const {id} = req.params;
    CustomersMedDetails.delete(id,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"User Deleted"})
    })
}

exports.updateCustomersMedDetailsStatus = (req,res) => {
    const {id} = req.params;
    CustomersMedDetails.updateOrderStatus(id,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"Success"})
    })
}

exports.getAllOptomestricMedDetails = (req,res) => {
    CustomersMedDetails.getAllOptometristOrders((err,result) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
}

exports.getAllAssistanceInvoiceMedDetails = (req,res) => {
    CustomersMedDetails.getAllAssistanceInvoices((err,result) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
}


exports.getAllAssistanceInvoicesMedicalDeatilsForRXCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    const date = req.body.date;
    CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsForRX(cmd_id, cid, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.getAllAssistanceInvoicesMedicalDeatilsSecondRxCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    const date = req.body.date;
    CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsSecondRX(cmd_id, cid, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.getAllAssistanceInvoicesMedicalDeatilsUnPiIoReadingCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    const date = req.body.date;
    CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsUnPiIoReading(cmd_id, cid, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.getAllAssistanceInvoicesMedicalDeatilsMoreCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    const date = req.body.date;
    CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsMore(cmd_id, cid, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result[0]);
    })
}

exports.getAllAssistanceInvoicesMedicalDeatilsObjectiveCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    const date = req.body.date;
    CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsObjective(cmd_id, cid, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.getAllAssistanceInvoicesMedicalDeatilsContactLenCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    const date = req.body.date;
    CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsContactLen(cmd_id, cid, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.getAllAssistanceInvoicesMedicalDeatilsRemarksCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    const date = req.body.date;
    CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsRemarks(cmd_id, cid, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.updateOrderStatusToCashierCon = (req,res) => {
    const {id} = req.params;
    const amount = req.body.amount;
    console.log(id,amount)
    CustomersMedDetails.updateOrderStatusToCashier(id,amount,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"Success"})
    })
}

exports.getAllCashierInvoiceMedDetails = (req,res) => {
    CustomersMedDetails.getAllCashierInvoices((err,result) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
}

exports.getCustomersHistory = (req,res) => {
    const {id} = req.params;
    CustomersMedDetails.getCustomerHistory(id, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.updateCashierOrderCon = (req,res) => {
    const {id} = req.params;
    CustomersMedDetails.updateCashierOrder(id,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"Success"})
    })
}

exports.updateandcomplateorderCon = (req,res) => {
    const {id} = req.params;
    CustomersMedDetails.updateandcomplateorder(id,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"Success"})
    })
}