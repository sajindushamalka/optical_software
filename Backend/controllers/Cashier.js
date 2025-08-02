const Cashier = require("../models/Cashier.js");

exports.getAllCustomers = (req, res) => {
    Cashier.getAll((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.getCustomerByID = (req, res) => {
    const { id } = req.params;
    Cashier.getById(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result);
    })
}

exports.createCustomer = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    Cashier.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created" });
    })
};

exports.updateCustomer = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;

    Cashier.update(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteCustomer = (req, res) => {
    const { id } = req.params;
    Cashier.delete(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}

exports.getAllFinishedOrdersCon = (req, res) => {
    Cashier.getAllFinishedOrders((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}