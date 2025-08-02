const OptMedDeatils = require("../models/OptMedDetailsRx.js");

exports.getAllOptMedDeatils = (req, res) => {
    OptMedDeatils.getAll((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.getOptMedDeatilsByID = (req, res) => {
    const { id } = req.params;
    OptMedDeatils.getById(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}

exports.createOptMedDeatils = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // OptMedDeatils.getByPrevValueCheck(newUser.ccmd_id, (err, result) => {
    //     if (err) return res.status(500).json({ err: err.message });
    //     if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
    //     OptMedDeatils.create(newUser, (err, result) => {
    //         if (err) return res.status(500).json({ err: err.message });
    //         res.status(201).json({ message: "User Created", id: result.insertId });
    //     });
    // });
    OptMedDeatils.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.createOptMedUNPIIOREDeatils = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // OptMedDeatils.getByPrevValueCheck2(newUser.ccmd_id, (err, result) => {
    //     if (err) return res.status(500).json({ err: err.message });
    //     if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
    //     OptMedDeatils.createunpiiore(newUser, (err, result) => {
    //         if (err) return res.status(500).json({ err: err.message });
    //         res.status(201).json({ message: "User Created", id: result.insertId });
    //     });
    // });
    OptMedDeatils.createunpiiore(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.createOptMedSecondDeatils = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // OptMedDeatils.getByPrevValueCheck3(newUser.ccmd_id, (err, result) => {
    //     if (err) return res.status(500).json({ err: err.message });
    //     if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
    //     OptMedDeatils.createsecond(newUser, (err, result) => {
    //         if (err) return res.status(500).json({ err: err.message });
    //         res.status(201).json({ message: "User Created", id: result.insertId });
    //     });
    // });
    OptMedDeatils.createsecond(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });

};


exports.createOptMedMore = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // OptMedDeatils.getByPrevValueCheck4(newUser.ccmd_id, (err, result) => {
    //     if (err) return res.status(500).json({ err: err.message });
    //     if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
    //     OptMedDeatils.createmore(newUser, (err, result) => {
    //         if (err) return res.status(500).json({ err: err.message });
    //         res.status(201).json({ message: "User Created", id: result.insertId });
    //     });
    // });
    OptMedDeatils.createmore(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.createOptMedobjective = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // console.log(newUser)
    // OptMedDeatils.getByPrevValueCheck5(newUser.ccmd_id, (err, result) => {
    //     if (err) return res.status(500).json({ err: err.message });
    //     if (result.length == 2) return res.status(400).json({ message: "Username already enter data" });
    //     OptMedDeatils.createoptobjective(newUser, (err, result) => {
    //         if (err) return res.status(500).json({ err: err.message });
    //         res.status(201).json({ message: "User Created", id: result.insertId });
    //     });
    // });
    OptMedDeatils.createoptobjective(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.createOptMedRemark = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // OptMedDeatils.getByPrevValueCheck6(newUser.ccmd_id, (err, result) => {
    //     if (err) return res.status(500).json({ err: err.message });
    //     if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
    //     OptMedDeatils.createoptremark(newUser, (err, result) => {
    //         if (err) return res.status(500).json({ err: err.message });
    //         res.status(201).json({ message: "User Created", id: result.insertId });
    //     });
    // });
    OptMedDeatils.createoptremark(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.createOptMedContactLen = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    // console.log(newUser)
    // OptMedDeatils.getByPrevValueCheck7(newUser.ccmd_id, (err, result) => {
    //     if (err) return res.status(500).json({ err: err.message });
    //     if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
    //     OptMedDeatils.createoptcontactlen(newUser, (err, result) => {
    //         if (err) return res.status(500).json({ err: err.message });
    //         res.status(201).json({ message: "User Created", id: result.insertId });
    //     });
    // });
    OptMedDeatils.createoptcontactlen(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateOptMedDeatils = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;

    OptMedDeatils.update(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteOptMedDeatils = (req, res) => {
    const { id } = req.params;
    OptMedDeatils.delete(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}

exports.getAllOptomestricMedDetails = (req, res) => {
    OptMedDeatils.getAllOptometristOrders((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.getOptCushistoryCon = (req, res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    OptMedDeatils.getOptCushistory(cmd_id, date, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result);
    })
}


exports.getOptCushistorySecCon = (req, res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    OptMedDeatils.getOptCushistorySec(cmd_id, date, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result);
    })
}

exports.getOptCushistoryThirdCon = (req, res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    OptMedDeatils.getOptCushistoryThird(cmd_id, date, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result);
    })
}


exports.getOptCushistoryObjectiveCon = (req, res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    OptMedDeatils.getOptCushistoryObjective(cmd_id, date, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result);
    })
}

exports.getOptCushistoryObjectiveRemarkCon = (req, res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    const category = req.body.category;
    OptMedDeatils.getOptCushistoryObjectiveRemark(cmd_id, date, category, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result);
    })
}

exports.getOptCushistoryCOntactCon = (req, res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    OptMedDeatils.getOptCushistoryCOntact(cmd_id, date, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result);
    })
}

exports.getOptCushistoryMoreCon = (req, res) => {
    const cmd_id = req.body.ccmd_id;
    const date = req.body.date;
    OptMedDeatils.getOptCushistoryMore(cmd_id, date, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}
