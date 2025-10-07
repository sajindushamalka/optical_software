const RootAdminModel = require("../models/RootAdmin.js");

exports.getAllPurposeofVisit = (req, res) => {
    RootAdminModel.getAll((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createPurposeofVisit = (req, res) => {
    const newUser = req.body;
    RootAdminModel.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatePurposeofVisit = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.update(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletePurposeofVisit = (req, res) => {
    const { id } = req.params;
    RootAdminModel.delete(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}




exports.getAllGeneralHealthCon = (req, res) => {
    RootAdminModel.getAllGeneralHealth((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createGeneralHealthCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createGeneralHealth(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateGeneralHealthCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateGeneralHealth(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteGeneralHealthCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteGeneralHealth(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllsymptomsCon = (req, res) => {
    RootAdminModel.getAllsymptoms((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createsymptomsCOn = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createsymptoms(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatesymptomsCOn = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatesymptoms(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletesymptomsCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletesymptoms(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlloccular_healthCon = (req, res) => {
    RootAdminModel.getAlloccular_health((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createoccular_healthCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createoccular_health(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateoccular_healthCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateoccular_health(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteoccular_healthCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteoccular_health(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlltype_of_lenseCon = (req, res) => {
    RootAdminModel.getAlltype_of_lense((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createtype_of_lenseCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createtype_of_lense(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatetype_of_lenseCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatetype_of_lense(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletetype_of_lenseCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletetype_of_lense(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlllens_materialCon = (req, res) => {
    RootAdminModel.getAlllens_material((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlens_materialCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlens_material(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelens_materialCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelens_material(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelens_materialCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelens_material(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlllenses_typeCon = (req, res) => {
    RootAdminModel.getAlllenses_type((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlenses_typeCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlenses_type(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelenses_typeCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelenses_type(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelenses_typeCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelenses_type(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlllens_treatmentCon = (req, res) => {
    RootAdminModel.getAlllens_treatment((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlens_treatmentCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlens_treatment(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelens_treatmentCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelens_treatment(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelens_treatmentCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelens_treatment(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlllens_colourCon = (req, res) => {
    RootAdminModel.getAlllens_colour((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlens_colourCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlens_colour(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelens_colourCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelens_colour(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelens_colourCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelens_colour(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}


exports.getAlllens_sizeCon = (req, res) => {
    RootAdminModel.getAlllens_size((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlens_sizeCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlens_size(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelens_sizeCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelens_size(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelens_sizeCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelens_size(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlllens_baseCon = (req, res) => {
    RootAdminModel.getAlllens_base((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlens_baseCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlens_base(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelens_baseCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelens_base(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelens_baseCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelens_base(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlllens_brandCon = (req, res) => {
    RootAdminModel.getAlllens_brand((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlens_brandCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlens_brand(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelens_brandCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelens_brand(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelens_brandCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelens_brand(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlllenses_atCon = (req, res) => {
    RootAdminModel.getAlllenses_at((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createlenses_atCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createlenses_at(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatelenses_atCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatelenses_at(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletelenses_atCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletelenses_at(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllframe_categoryCon = (req, res) => {
    RootAdminModel.getAllframe_category((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createframe_categoryCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createframe_category(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateframe_categoryCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateframe_category(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteframe_categoryCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteframe_category(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllframe_materialCon = (req, res) => {
    RootAdminModel.getAllframe_material((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createframe_materialCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createframe_material(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateframe_materialCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateframe_material(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteframe_materialCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteframe_material(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllframe_typeCon = (req, res) => {
    RootAdminModel.getAllframe_type((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createframe_typeCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createframe_type(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateframe_typeCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateframe_type(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteframe_typeCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteframe_type(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllframe_colorCon = (req, res) => {
    RootAdminModel.getAllframe_color((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createframe_colorCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createframe_color(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateframe_colorCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateframe_color(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteframe_colorCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteframe_color(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}


exports.getAlldoctor_rxCon = (req, res) => {
    RootAdminModel.getAlldoctor_rx((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createdoctor_rxCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createdoctor_rx(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatedoctor_rxCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatedoctor_rx(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletedoctor_rxCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletedoctor_rx(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAlltested_byCon = (req, res) => {
    RootAdminModel.getAlltested_by((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createtested_byCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createtested_by(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatetested_byCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatetested_by(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletetested_byCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletetested_by(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllentered_byCon = (req, res) => {
    RootAdminModel.getAllentered_by((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createentered_byCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createentered_by(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateentered_byCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateentered_by(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteentered_byCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteentered_by(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllusersCon = (req, res) => {
    RootAdminModel.getAllusers((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createusersCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createusers(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updateusersCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updateusers(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deleteusersCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deleteusers(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}



exports.getAllcashier_invoice_detailsCon = (req, res) => {
    RootAdminModel.getAllcashier_invoice_details((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createcashier_invoice_detailsCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createcashier_invoice_details(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatecashier_invoice_detailsCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatecashier_invoice_details(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletecashier_invoice_detailsCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletecashier_invoice_details(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}


exports.getchasiercomplateinvoicetableCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.getchasiercomplateinvoicetable(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.updatecashier_invoiceTable_detailsCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatecashier_invoiceTable_details(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.updatecashier_invoice_date_detailsCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatecashier_invoice_date_details(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}



exports.getAllWearerTypeCon = (req, res) => {
    RootAdminModel.getAllWearerType((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createdWearerTypeCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createdWearerType(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatedWearerTypeCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatedWearerType(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletedWearerTypeCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletedWearerType(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}


exports.getAllLensTypeContactLenseCon = (req, res) => {
    RootAdminModel.getAllLensTypeContactLense((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createdLensTypeContactLenseCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createdLensTypeContactLense(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatedLensTypeContactLenseCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatedLensTypeContactLense(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletedLensTypeContactLenseCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletedLensTypeContactLense(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}


exports.getAllSoftLensMaterialCon = (req, res) => {
    RootAdminModel.getAllSoftLensMaterial((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createdSoftLensMaterialCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createdSoftLensMaterial(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatedSoftLensMaterialCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatedSoftLensMaterial(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletedSoftLensMaterialCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletedSoftLensMaterial(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}


exports.getAllSoftLensDesignCon = (req, res) => {
    RootAdminModel.getAllSoftLensDesign((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createdSoftLensDesignCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createdSoftLensDesign(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatedSoftLensDesignCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatedSoftLensDesign(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletedSoftLensDesignCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletedSoftLensDesign(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}


exports.getAllWearerScheduleCon = (req, res) => {
    RootAdminModel.getAllWearerSchedule((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.createdWearerScheduleCon = (req, res) => {
    const newUser = req.body;
    RootAdminModel.createdWearerSchedule(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "User Created", id: result.insertId });
    });
};

exports.updatedWearerScheduleCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    RootAdminModel.updatedWearerSchedule(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.deletedWearerScheduleCon = (req, res) => {
    const { id } = req.params;
    RootAdminModel.deletedWearerSchedule(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json({ message: "User Deleted" })
    })
}