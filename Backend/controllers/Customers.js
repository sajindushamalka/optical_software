const Customers = require("../models/Customers.js");

exports.getAllCustomers = (req,res) => {
    Customers.getAll((err,result) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
}

exports.getCustomerByID = (req,res) => {
    const {id} = req.params;
    Customers.getById(id, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result[0]);
    })
}

exports.createCustomer = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    Customers.getUserByUserName(newUser.nic, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length != 0) return res.status(400).json({ message: "Username already exists" });
        Customers.create(newUser, (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            console.log(result)
            res.status(201).json({ message: "User Created" });
        });
    });
};

exports.updateCustomer = (req,res) => {
    const {id} = req.params;
    const updateU = req.body;

    Customers.update(id,updateU,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json(this.updateU)
    })
}

exports.deleteCustomer = (req,res) => {
    const {id} = req.params;
    Customers.delete(id,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"User Deleted"})
    })
}
