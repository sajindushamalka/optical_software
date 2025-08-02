const db = require("../db/DB_Config.js");

const Cashier = {
    getAll: (callback) => {
        db.query("select * from optical_software.customer_med_details cmd, optical_software.customers c, optical_software.cashier_payments_details p  where c.c_id = cmd.cid and p.opt_id = cmd.cmd_id and report_status = 'Pass_to_Final_Invoice'", callback);
    },
    getById: (id, callback) => {
        db.query(
            "Select * from optical_software.cashier_payments_details where opt_id = ?",
            [id],
            callback
        );
    },
    create: (customer, callback) => {
        db.query("Insert into optical_software.cashier_payments_details SET ?", customer, callback);
    },
    update: (id, customer, callback) => {
        db.query(
            "Update optical_software.customers SET ? where c_id = ?",
            [customer, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query("Delete from optical_software.customers where c_id = ? ", [id], callback);
    },
    getUserByUserName: (email, callback) => {
        db.query("Select * from optical_software.customers where email = ? ", [email], callback);
    },
     getAllFinishedOrders: (callback) => {
        db.query("select * from optical_software.customer_med_details cmd, optical_software.customers c  where c.c_id = cmd.cid and report_status = 'Complete_Order'", callback);
    },
};

module.exports = Cashier;