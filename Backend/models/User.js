const db = require("../db/DB_Config.js");

const User = {
  getAll: (callback) => {
    db.query("Select * from optical_software.users", callback);
  },
  getById: (id, callback) => {
    db.query(
      "Select * from optical_software.users where u_id = ?",
      [id],
      callback
    );
  },
  create: (user, callback) => {
    db.query("Insert into optical_software.users SET ?", user, callback);
  },
  update: (id, user, callback) => {
    db.query(
      "Update optical_software.users SET ? where u_id = ?",
      [user, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("Delete from optical_software.users where u_id = ? ", [id], callback);
  },
  getUserByUserName: (name,callback) => {
    db.query("Select * from optical_software.users where username = ? ",[name],callback);
  }
};

module.exports = User;