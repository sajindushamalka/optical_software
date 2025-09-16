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
            // "Update optical_software.new_customer_order_assitance SET report_status = 'Pass_to_Cash' where cmd_id = ?",
            "Update optical_software.new_customer_order_assitance SET report_status = 'Pass_to_Cash' where cmd_id = ?",
            [id],
            callback
        );
    },

    getCustomerRecForCashier: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a, optical_software.customers c where c.c_id = a.cid and  a.report_status = 'Pass_to_Cash' ORDER BY a.date DESC;",
            callback
        );
    },

    createCashierInvoice: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.cashier_invoice SET ?",
            customermeddeatils,
            callback
        );
    },

    createCashierInvoiceTableItems: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.cashier_invoice_item_table SET ?",
            customermeddeatils,
            callback
        );
    },

    updateStatusCashierStatus: (id, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET report_status = 'Complete_Full_Payment' where cmd_id = ?",
            [id],
            callback
        );
    },

    updateStatusCashierStatusAdvance: (id, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET report_status = 'Complete_Full_Advance' where cmd_id = ?",
            [id],
            callback
        );
    },

    getCustomerRecForComplate: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a, optical_software.customers c, optical_software.cashier_invoice ci where c.c_id = a.cid and ci.cmd_id = a.cmd_id and  a.report_status = 'Complate_Order' ORDER BY a.date DESC;",
            callback
        );
    },

    getAllOptimsitricRecords: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a, optical_software.customers c where c.c_id = a.cid ORDER BY a.date DESC",
            callback
        );
    },

    getUploadedFilesNameOnly: (id, id2, callback) => {
        db.query(
            "select * from optical_software.customer_files where cmd_id = ? and cid = ? ",
            [id, id2],
            callback
        );
    },

    getBrokenOrders: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a, optical_software.customers c where c.c_id = a.cid and  a.report_status = 'Pass_to_Prev' ORDER BY a.date DESC;",
            callback
        );
    },

    updateAssistanceDetils: (id, customer, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET ? where cmd_id = ?",
            [customer, id],
            callback
        );
    },

    updateCustomeDetails: (id, customer, callback) => {
        db.query(
            "Update optical_software.customers SET ? where c_id = ?",
            [customer, id],
            callback
        );
    },

    getCustomerRecForPrescription: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a, optical_software.customers c, optical_software.customer_order_assistance_last_details ca where c.c_id = a.cid and ca.cmd_id = a.cmd_id and  a.report_status IN ('Complete_Full_Payment', 'Complete_Full_Advance') ORDER BY a.date DESC;",
            callback
        );
    },

    updateStatusTOfactory: (id, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET report_status = 'Pass_to_Factory' where cmd_id = ?",
            [id],
            callback
        );
    },

    getCustomerFactoryDetails: (callback) => {
        db.query(
            "SELECT * FROM optical_software.new_customer_order_assitance a JOIN optical_software.customers c  ON c.c_id = a.cid JOIN optical_software.customer_order_assistance_last_details ca  ON ca.cmd_id = a.cmd_id JOIN optical_software.customer_order_optometrist_subjective_details cos ON cos.cmd_id = a.cmd_id WHERE a.report_status IN ('Complete_Full_Advance', 'Complete_Full_Payment') ORDER BY a.date DESC;",
            callback
        );
    },

    updateStatusfactoryProceesing: (id, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET report_status = 'Factory_Processing' where cmd_id = ?",
            [id],
            callback
        );
    },

    updateStatusfactorytext: (id, msg, callback) => {
        db.query(
            "Update optical_software.customer_order_assistance_last_details SET factory_remark = ? where coaldid = ?",
            [msg, id],
            callback
        );
    },

    getJobStatusDeatils: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a,optical_software.customers cu,  optical_software.customer_order_assistance_last_details  c where a.cmd_id = c.cmd_id and cu.c_id = a.cid and a.report_status IN ('Complete_Full_Advance', 'Complete_Full_Payment') ",
            callback
        );
    },

    updateJobStatus: (rd, rt, nd, js, id, callback) => {
        db.query(
            "Update optical_software.customer_order_assistance_last_details SET removed_date = ? , notification_type = ?, notification_date = ? , job_status = ? where coaldid = ?",
            [rd, rt, nd, js, id],
            callback
        );
    },

    finishOrder: (id, callback) => {
        db.query(
            "Update optical_software.new_customer_order_assitance SET report_status = 'Complate_Order' where cmd_id = ?",
            [id],
            callback
        );
    },


    getAdvancepayamentOnly: (callback) => {
        db.query(
            "select * from optical_software.new_customer_order_assitance a, optical_software.customers c, optical_software.cashier_invoice ci where c.c_id = a.cid and ci.cmd_id = a.cmd_id and  a.report_status = 'Complete_Full_Advance' ORDER BY a.date DESC;",
            callback
        );
    },

    createCashierInvoiceRecipt: (customermeddeatils, callback) => {
        db.query(
            "Insert into optical_software.cashier_recipt SET ?",
            customermeddeatils,
            callback
        );
    },

    getPartialPaymentAmount: (id, callback) => {
        db.query(
            "Select  SUM(amount) as sum from optical_software.cashier_recipt where ci_id = ?",
            [id],
            callback
        );
    },
};

module.exports = NewCustomersMedDeatils;
