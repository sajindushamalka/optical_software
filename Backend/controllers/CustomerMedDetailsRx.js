const CustomersMedDetailsRx = require("../models/CustomerMedDetailsRx.js");

exports.getAllCustomersMedDetailsRx = (req,res) => {
    CustomersMedDetailsRx.getAll((err,result) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
}

exports.getCustomersMedDetailsRxByID = (req,res) => {
    const {id} = req.params;
    CustomersMedDetailsRx.getById(id, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result[0]);
    })
}

exports.createCustomersMedDetailsRx = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    CustomersMedDetailsRx.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created" });
    });
};

exports.updateCustomersMedDetailsRx = (req,res) => {
    const {id} = req.params;
    const updateU = req.body;

    CustomersMedDetailsRx.update(id,updateU,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json(this.updateU)
    })
}

exports.deleteCustomersMedDetailsRx = (req,res) => {
    const {id} = req.params;
    CustomersMedDetailsRx.delete(id,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"User Deleted"})
    })
}


exports.getCustomersMedDetailsRxBySpecialID = (req,res) => {
    const date = req.body.date;
    const ccmd_id = req.body.ccmd_id;
    const cid = req.body.cid;
    console.log(date,ccmd_id,cid)
    CustomersMedDetailsRx.getByCustomerRxId(date,ccmd_id,cid, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}

exports.getCustomerHistoryRXCon = (req,res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    CustomersMedDetailsRx.getCustomerHistoryRX(cmd_id, date, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result);
    })
}