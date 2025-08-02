const db = require("../db/DB_Config.js");

const Customers = {
  getAll: (callback) => {
    db.query("Select * from optical_software.customers", callback);
  },
  getById: (id, callback) => {
    db.query(
      "Select * from optical_software.customers where c_id = ?",
      [id],
      callback
    );
  },
  create: (customer, callback) => {
    db.query("Insert into optical_software.customers SET ?", customer, callback);
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
  getUserByUserName: (email,callback) => {
    db.query("Select * from optical_software.customers where email = ? ",[email],callback);
  }
};

module.exports = Customers;