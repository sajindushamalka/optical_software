const db = require("../db/DB_Config.js");

const NewCustomersMedDeatils = {
    getCustomerOldRecords: (id, callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance where cid = ? ORDER BY date DESC;",
            [id],
            callback
        );
    },

    create: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.new_customer_order_assitance SET ?",
            customermeddeatils,
            callback
        );
    },

    getAllTodayOrders: (callback) => {
        db.query("select * from optical_software.new_customer_order_assitance o, optical_software.customers c where c.c_id = o.cid and o.report_status = 'Pass_to_O' order by o.today_no", callback);
    },

    optimizer_create: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.customer_order_optometrist_subjective_details  SET ?",
            customermeddeatils,
            callback
        );
    },

    getByCMDId: (id, callback) => {
        db.query(
            "Select * from optical_software.customer_order_optometrist_subjective_details where cmd_id = ?",
            [id],
            callback
        );
    },

    optimizer_objective_create: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.customer_order_optometrist_objective_details  SET ?",
            customermeddeatils,
            callback
        );
    },

    getByCMDIdObjective: (id, callback) => {
        db.query(
            "Select * from optical_software.customer_order_optometrist_objective_details where cmd_id = ?",
            [id],
            callback
        );
    },

    optimizer_contact_lenses_create: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.customer_order_optometrist_contact_lenses_details  SET ?",
            customermeddeatils,
            callback
        );
    },

    getByCMDIdContactLenses: (id, callback) => {
        db.query(
            "Select * from optical_software.customer_order_optometrist_contact_lenses_details where cmd_id = ?",
            [id],
            callback
        );
    },

    updateStatusOptimizer: (id, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET report_status = 'Pass_to_Ass' where cmd_id = ?",
            [id],
            callback
        );
    },

    saveFile: (data, callback) => {
        const query =
            "INSERT INTO customer_files (cid, type, file_name, file_type, data, upload_date) VALUES (?, ?, ?, ?, ?, NOW())";
        db.query(
            query,
            [data.cid, data.type, data.file_name, data.file_type, data.data],
            callback
        );
    },

    getFilesByUser: (cid, callback) => {
        db.query("SELECT id, file_name, file_type FROM customer_files WHERE cid = ?", [cid], callback);
    },

    getFileById: (id, callback) => {
        db.query("SELECT * FROM customer_files WHERE id = ?", [id], callback);
    },

    getCustomerRecForAssistance: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a, optical_software.customers c where c.c_id = a.cid and  a.report_status = 'Pass_to_Ass' ORDER BY a.date DESC;",
            callback
        );
    },

    getByIDWithOptimisticFilled: (id, callback) => {
        db.query(
            "Select * from optical_software.customer_order_optometrist_subjective_details where cmd_id = ?",
            [id],
            callback
        );
    },

    getByIDWithOptimisticObjectiveFilled: (id, callback) => {
        db.query(
            "Select * from optical_software.customer_order_optometrist_objective_details where cmd_id = ?",
            [id],
            callback
        );
    },

    getByIDWithOptimisticContactLensesFilled: (id, callback) => {
        db.query(
            "Select * from optical_software.customer_order_optometrist_contact_lenses_details where cmd_id = ?",
            [id],
            callback
        );
    },

    createAssistanceSecond: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.customer_order_assistance_last_details SET ?",
            customermeddeatils,
            callback
        );
    },

    getBycreateAssistanceSecond: (id, callback) => {
        db.query(
            "Select * from optical_software.customer_order_assistance_last_details where cmd_id = ?",
            [id],
            callback
        );
    },

    updateStatusAssistacnceSecond: (id, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET report_status = 'Pass_to_Cash' where cmd_id = ?",
            [id],
            callback
        );
    },

    // getAll: (callback) => {
    //     db.query("select * from optical_software.new_customer_order_assitance oc, optical_software.customers c where oc.cid = c.c_id", callback);
    // },
    // getById: (id, callback) => {
    //     db.query(
    //         "Select * from optical_software.new_customer_order_assitance where cid = ?",
    //         [id],
    //         callback
    //     );
    // },
    // create: (customermeddeatils, callback) => {
    //     db.query(
    //         "Insert into optical_software.customer_med_details SET ?",
    //         customermeddeatils,
    //         callback
    //     );
    // },
    // update: (id, customer, callback) => {
    //     db.query(
    //         "Update optical_software.customer_med_details SET ? where cmd_id = ?",
    //         [customer, id],
    //         callback
    //     );
    // },
    // delete: (id, callback) => {
    //     db.query(
    //         "Delete from optical_software.customer_med_details where cmd_id = ? ",
    //         [id],
    //         callback
    //     );
    // },
    // getAllOptometristOrders: (callback) => {
    //     db.query(
    //         "select * from optical_software.customer_med_details cmd, optical_software.customers c  where c.c_id = cmd.cid and report_status = 'Pass_to_optometrist' ORDER BY date ASC;",
    //         callback
    //     );
    // },
    // updateOrderStatus: (id, callback) => {
    //     db.query(
    //         "Update optical_software.customer_med_details SET report_status = 'Pass_to_Assistance' where cmd_id = ?",
    //         [id],
    //         callback
    //     );
    // },
    // getAllAssistanceInvoices: (callback) => {
    //     db.query(
    //         "select * from optical_software.customer_med_details cmd, optical_software.customers c  where c.c_id = cmd.cid and report_status = 'Pass_to_Assistance' ORDER BY date DESC;",
    //         callback
    //     );
    // },
    // getAllAssistanceInvoicesMedicalDeatilsForRX: (
    //     cmd_id,
    //     cid,
    //     date,
    //     callback
    // ) => {
    //     db.query(
    //         "select * from optical_software.reading_total_opt where ccmd_id = ? and cid = ? and date = ? ",
    //         [cmd_id, cid, date],
    //         callback
    //     );
    // },

    // getAllAssistanceInvoicesMedicalDeatilsSecondRX: (
    //     date,
    //     ccmd_id,
    //     cid,
    //     callback
    // ) => {
    //     db.query(
    //         "select * from optical_software.reading_total_opt_second  where ccmd_id = ? and cid = ? and date = ? ",
    //         [date, ccmd_id, cid],
    //         callback
    //     );
    // },

    // getAllAssistanceInvoicesMedicalDeatilsUnPiIoReading: (
    //     date,
    //     ccmd_id,
    //     cid,
    //     callback
    // ) => {
    //     db.query(
    //         "select * from optical_software.reading_total_un_pi_io_re_opt  where ccmd_id = ? and cid = ? and date = ? ",
    //         [date, ccmd_id, cid],
    //         callback
    //     );
    // },

    // getAllAssistanceInvoicesMedicalDeatilsMore: (
    //     date,
    //     ccmd_id,
    //     cid,
    //     callback
    // ) => {
    //     db.query(
    //         "select * from optical_software.reading_total_opt_more where ccmd_id = ? and cid = ? and date = ?",
    //         [date, ccmd_id, cid],
    //         callback
    //     );
    // },

    // getAllAssistanceInvoicesMedicalDeatilsObjective: (
    //     date,
    //     ccmd_id,
    //     cid,
    //     callback
    // ) => {
    //     db.query(
    //         "select * from optical_software.opt_objective  where ccmd_id = ? and cid = ? and date = ? ",
    //         [date, ccmd_id, cid],
    //         callback
    //     );
    // },

    // getAllAssistanceInvoicesMedicalDeatilsContactLen: (
    //     date,
    //     ccmd_id,
    //     cid,
    //     callback
    // ) => {
    //     db.query(
    //         "select * from optical_software.opt_contact_len where ccmd_id = ? and cid = ? and date =  ? ",
    //         [date, ccmd_id, cid],
    //         callback
    //     );
    // },

    // getAllAssistanceInvoicesMedicalDeatilsRemarks: (
    //     date,
    //     ccmd_id,
    //     cid,
    //     callback
    // ) => {
    //     db.query(
    //         "select * from optical_software.opt_remarks where ccmd_id = ? and cid = ? and date =  ? ;",
    //         [date, ccmd_id, cid],
    //         callback
    //     );
    // },

    // updateOrderStatusToCashier: (id, amount, callback) => {
    //     db.query(
    //         "Update optical_software.customer_med_details SET report_status = 'Pass_to_Cashier' , contact_len_type = ?  where cmd_id = ?",
    //         [amount, id],
    //         callback
    //     );
    // },
    // getAllCashierInvoices: (callback) => {
    //     db.query(
    //         "select * from optical_software.customer_med_details cmd, optical_software.customers c  where c.c_id = cmd.cid and report_status = 'Pass_to_Cashier' ORDER BY date DESC;",
    //         callback
    //     );
    // },
    // getCustomerHistory: (id, callback) => {
    //     db.query(
    //         "select * from optical_software.customer_med_details where cid = ?",
    //         [id],
    //         callback
    //     );
    // },
    // updateCashierOrder: (id, callback) => {
    //     db.query(
    //         "Update optical_software.customer_med_details SET report_status = 'Pass_to_Final_Invoice' where cmd_id = ?",
    //         [id],
    //         callback
    //     );
    // },
    // updateandcomplateorder: (id, callback) => {
    //     db.query(
    //         "Update optical_software.customer_med_details SET report_status = 'Complete_Order' where cmd_id = ?",
    //         [id],
    //         callback
    //     );
    // },
};

module.exports = NewCustomersMedDeatils;
