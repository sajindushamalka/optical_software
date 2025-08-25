const db = require("../db/DB_Config.js");

const RootAdmin = {
    getAll: (callback) => {
        db.query("select * from optical_software.purpose_of_visit", callback);
    },
    create: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.purpose_of_visit SET ?",
            customermeddeatils,
            callback
        );
    },
    update: (id, customer, callback) => {
        db.query(
            "Update optical_software.purpose_of_visit SET ? where pov_id = ?",
            [customer, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query(
            "Delete from optical_software.purpose_of_visit where pov_id = ? ",
            [id],
            callback
        );
    },


    getAllGeneralHealth: (callback) => {
        db.query("select * from optical_software.general_health", callback);
    },
    createGeneralHealth: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.general_health SET ?",
            customermeddeatils,
            callback
        );
    },
    updateGeneralHealth: (id, customer, callback) => {
        db.query(
            "Update optical_software.general_health SET ? where gh_id = ?",
            [customer, id],
            callback
        );
    },
    deleteGeneralHealth: (id, callback) => {
        db.query(
            "Delete from optical_software.general_health where gh_id = ? ",
            [id],
            callback
        );
    },

    getAllsymptoms: (callback) => {
        db.query("select * from optical_software.symptoms", callback);
    },
    createsymptoms: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.symptoms SET ?",
            customermeddeatils,
            callback
        );
    },
    updatesymptoms: (id, customer, callback) => {
        db.query(
            "Update optical_software.symptoms SET ? where s_id = ?",
            [customer, id],
            callback
        );
    },
    deletesymptoms: (id, callback) => {
        db.query(
            "Delete from optical_software.symptoms where s_id = ? ",
            [id],
            callback
        );
    },

    getAlloccular_health: (callback) => {
        db.query("select * from optical_software.occular_health", callback);
    },
    createoccular_health: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.occular_health SET ?",
            customermeddeatils,
            callback
        );
    },
    updateoccular_health: (id, customer, callback) => {
        db.query(
            "Update optical_software.occular_health SET ? where oh_id = ?",
            [customer, id],
            callback
        );
    },
    deleteoccular_health: (id, callback) => {
        db.query(
            "Delete from optical_software.occular_health where oh_id = ? ",
            [id],
            callback
        );
    },

    getAlltype_of_lense: (callback) => {
        db.query("select * from optical_software.type_of_lense", callback);
    },
    createtype_of_lense: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.type_of_lense SET ?",
            customermeddeatils,
            callback
        );
    },
    updatetype_of_lense: (id, customer, callback) => {
        db.query(
            "Update optical_software.type_of_lense SET ? where tol_id = ?",
            [customer, id],
            callback
        );
    },
    deletetype_of_lense: (id, callback) => {
        db.query(
            "Delete from optical_software.type_of_lense where tol_id = ? ",
            [id],
            callback
        );
    },

    getAlllens_material: (callback) => {
        db.query("select * from optical_software.lens_material", callback);
    },
    createlens_material: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lens_material SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelens_material: (id, customer, callback) => {
        db.query(
            "Update optical_software.lens_material SET ? where lm_id = ?",
            [customer, id],
            callback
        );
    },
    deletelens_material: (id, callback) => {
        db.query(
            "Delete from optical_software.lens_material where lm_id = ? ",
            [id],
            callback
        );
    },

    getAlllenses_type: (callback) => {
        db.query("select * from optical_software.lenses_type", callback);
    },
    createlenses_type: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lenses_type SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelenses_type: (id, customer, callback) => {
        db.query(
            "Update optical_software.lenses_type SET ? where lt_id = ?",
            [customer, id],
            callback
        );
    },
    deletelenses_type: (id, callback) => {
        db.query(
            "Delete from optical_software.lenses_type where lt_id = ? ",
            [id],
            callback
        );
    },

    getAlllens_treatment: (callback) => {
        db.query("select * from optical_software.lens_treatment", callback);
    },
    createlens_treatment: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lens_treatment SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelens_treatment: (id, customer, callback) => {
        db.query(
            "Update optical_software.lens_treatment SET ? where lt_id = ?",
            [customer, id],
            callback
        );
    },
    deletelens_treatment: (id, callback) => {
        db.query(
            "Delete from optical_software.lens_treatment where lt_id = ? ",
            [id],
            callback
        );
    },

    getAlllens_colour: (callback) => {
        db.query("select * from optical_software.lens_colour", callback);
    },
    createlens_colour: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lens_colour SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelens_colour: (id, customer, callback) => {
        db.query(
            "Update optical_software.lens_colour SET ? where lc_id = ?",
            [customer, id],
            callback
        );
    },
    deletelens_colour: (id, callback) => {
        db.query(
            "Delete from optical_software.lens_colour where lc_id = ? ",
            [id],
            callback
        );
    },

    getAlllens_size: (callback) => {
        db.query("select * from optical_software.lens_size", callback);
    },
    createlens_size: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lens_size SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelens_size: (id, customer, callback) => {
        db.query(
            "Update optical_software.lens_size SET ? where ls_id = ?",
            [customer, id],
            callback
        );
    },
    deletelens_size: (id, callback) => {
        db.query(
            "Delete from optical_software.lens_size where ls_id = ? ",
            [id],
            callback
        );
    },

    getAlllens_base: (callback) => {
        db.query("select * from optical_software.lens_base", callback);
    },
    createlens_base: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lens_base SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelens_base: (id, customer, callback) => {
        db.query(
            "Update optical_software.lens_base SET ? where lb_id = ?",
            [customer, id],
            callback
        );
    },
    deletelens_base: (id, callback) => {
        db.query(
            "Delete from optical_software.lens_base where lb_id = ? ",
            [id],
            callback
        );
    },

    getAlllens_brand: (callback) => {
        db.query("select * from optical_software.lens_brand", callback);
    },
    createlens_brand: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lens_brand SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelens_brand: (id, customer, callback) => {
        db.query(
            "Update optical_software.lens_brand SET ? where lb_id = ?",
            [customer, id],
            callback
        );
    },
    deletelens_brand: (id, callback) => {
        db.query(
            "Delete from optical_software.lens_brand where lb_id = ? ",
            [id],
            callback
        );
    },

    getAlllenses_at: (callback) => {
        db.query("select * from optical_software.lenses_at", callback);
    },
    createlenses_at: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.lenses_at SET ?",
            customermeddeatils,
            callback
        );
    },
    updatelenses_at: (id, customer, callback) => {
        db.query(
            "Update optical_software.lenses_at SET ? where la_id = ?",
            [customer, id],
            callback
        );
    },
    deletelenses_at: (id, callback) => {
        db.query(
            "Delete from optical_software.lenses_at where la_id = ? ",
            [id],
            callback
        );
    },

    getAllframe_category: (callback) => {
        db.query("select * from optical_software.frame_category", callback);
    },
    createframe_category: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.frame_category SET ?",
            customermeddeatils,
            callback
        );
    },
    updateframe_category: (id, customer, callback) => {
        db.query(
            "Update optical_software.frame_category SET ? where fc_id = ?",
            [customer, id],
            callback
        );
    },
    deleteframe_category: (id, callback) => {
        db.query(
            "Delete from optical_software.frame_category where fc_id = ? ",
            [id],
            callback
        );
    },

    getAllframe_material: (callback) => {
        db.query("select * from optical_software.frame_material", callback);
    },
    createframe_material: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.frame_material SET ?",
            customermeddeatils,
            callback
        );
    },
    updateframe_material: (id, customer, callback) => {
        db.query(
            "Update optical_software.frame_material SET ? where fm_id = ?",
            [customer, id],
            callback
        );
    },
    deleteframe_material: (id, callback) => {
        db.query(
            "Delete from optical_software.frame_material where fm_id = ? ",
            [id],
            callback
        );
    },

    getAllframe_type: (callback) => {
        db.query("select * from optical_software.frame_type", callback);
    },
    createframe_type: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.frame_type SET ?",
            customermeddeatils,
            callback
        );
    },
    updateframe_type: (id, customer, callback) => {
        db.query(
            "Update optical_software.frame_type SET ? where ft_id = ?",
            [customer, id],
            callback
        );
    },
    deleteframe_type: (id, callback) => {
        db.query(
            "Delete from optical_software.frame_type where ft_id = ? ",
            [id],
            callback
        );
    },

    getAllframe_color: (callback) => {
        db.query("select * from optical_software.frame_color", callback);
    },
    createframe_color: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.frame_color SET ?",
            customermeddeatils,
            callback
        );
    },
    updateframe_color: (id, customer, callback) => {
        db.query(
            "Update optical_software.frame_color SET ? where fc_id = ?",
            [customer, id],
            callback
        );
    },
    deleteframe_color: (id, callback) => {
        db.query(
            "Delete from optical_software.frame_color where fc_id = ? ",
            [id],
            callback
        );
    },

    getAlldoctor_rx: (callback) => {
        db.query("select * from optical_software.doctor_rx", callback);
    },
    createdoctor_rx: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.doctor_rx SET ?",
            customermeddeatils,
            callback
        );
    },
    updatedoctor_rx: (id, customer, callback) => {
        db.query(
            "Update optical_software.doctor_rx SET ? where dr_id = ?",
            [customer, id],
            callback
        );
    },
    deletedoctor_rx: (id, callback) => {
        db.query(
            "Delete from optical_software.doctor_rx where dr_id = ? ",
            [id],
            callback
        );
    },

    getAlltested_by: (callback) => {
        db.query("select * from optical_software.tested_by", callback);
    },
    createtested_by: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.tested_by SET ?",
            customermeddeatils,
            callback
        );
    },
    updatetested_by: (id, customer, callback) => {
        db.query(
            "Update optical_software.tested_by SET ? where tb_id = ?",
            [customer, id],
            callback
        );
    },
    deletetested_by: (id, callback) => {
        db.query(
            "Delete from optical_software.tested_by where tb_id = ? ",
            [id],
            callback
        );
    },

    getAllentered_by: (callback) => {
        db.query("select * from optical_software.entered_by", callback);
    },
    createentered_by: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.entered_by SET ?",
            customermeddeatils,
            callback
        );
    },
    updateentered_by: (id, customer, callback) => {
        db.query(
            "Update optical_software.entered_by SET ? where eb_id = ?",
            [customer, id],
            callback
        );
    },
    deleteentered_by: (id, callback) => {
        db.query(
            "Delete from optical_software.entered_by where eb_id = ? ",
            [id],
            callback
        );
    },

    getAllusers: (callback) => {
        db.query("select * from optical_software.users", callback);
    },
    createusers: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.users SET ?",
            customermeddeatils,
            callback
        );
    },
    updateusers: (id, customer, callback) => {
        db.query(
            "Update optical_software.users SET ? where u_id = ?",
            [customer, id],
            callback
        );
    },
    deleteusers: (id, callback) => {
        db.query(
            "Delete from optical_software.users where u_id = ? ",
            [id],
            callback
        );
    },
};

module.exports = RootAdmin;
