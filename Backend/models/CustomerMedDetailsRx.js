const db = require("../db/DB_Config.js");

const CustomersMedDeatilsRx = {
  getAll: (callback) => {
    db.query("Select * from optical_software.customer_med_details_rx", callback);
  },
  getById: (id, callback) => {
    db.query(
      "Select * from optical_software.customer_med_details_rx where cmdr_id = ?",
      [id],
      callback
    );
  },
  create: (customermeddeatils, callback) => {
    db.query("Insert into optical_software.customer_med_details_rx SET ?", customermeddeatils, callback);
  },
  update: (id, customer, callback) => {
    db.query(
      "Update optical_software.customer_med_details_rx SET ? where cmdr_id = ?",
      [customer, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("Delete from optical_software.customer_med_details_rx where cmdr_id = ? ", [id], callback);
  },
  getByCustomerRxId: (date, ccmd_id, cid, callback) => {
    db.query(
      "select * from optical_software.customer_med_details_rx where date = ? and ccmd_id = ? and cid = ?",
      [date,ccmd_id,cid],
      callback
    );
  },
   getByCustomerRxSecond: (date, ccmd_id, cid, callback) => {
    db.query(
      "select * from optical_software.reading_total_opt_second  where ccmd_id = ? and cid = ? and date = ? ",
      [date,ccmd_id,cid],
      callback
    );
  },
  getCustomerHistoryRX: (id,date, callback) => {
    db.query(
      "select * from optical_software.customer_med_details_rx where date = ? and ccmd_id = ?",
      [date,id],
      callback
    );
  },
};

module.exports = CustomersMedDeatilsRx;