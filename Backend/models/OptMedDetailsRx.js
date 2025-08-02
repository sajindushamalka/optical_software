const db = require("../db/DB_Config.js");

const OptMedDeatilosRx = {
  getAll: (callback) => {
    db.query("Select * from optical_software.reading_total_opt", callback);
  },
  getById: (id, callback) => {
    db.query(
      "Select * from optical_software.reading_total_opt where rto_id = ?",
      [id],
      callback
    );
  },
  create: (customermeddeatils, callback) => {
    db.query(
      "Insert into optical_software.reading_total_opt SET ?",
      customermeddeatils,
      callback
    );
  },
  createunpiiore: (customermeddeatils, callback) => {
    db.query(
      "Insert into optical_software.reading_total_un_pi_io_re_opt SET ?",
      customermeddeatils,
      callback
    );
  },
  createsecond: (customermeddeatils, callback) => {
    db.query(
      "Insert into optical_software.reading_total_opt_second SET ?",
      customermeddeatils,
      callback
    );
  },
  createmore: (customermeddeatils, callback) => {
    db.query(
      "Insert into optical_software.reading_total_opt_more SET ?",
      customermeddeatils,
      callback
    );
  },
  createoptobjective: (customermeddeatils, callback) => {
    db.query(
      "Insert into optical_software.opt_objective SET ?",
      customermeddeatils,
      callback
    );
  },
  createoptremark: (customermeddeatils, callback) => {
    db.query(
      "Insert into optical_software.opt_remarks SET ?",
      customermeddeatils,
      callback
    );
  },
  createoptcontactlen: (customermeddeatils, callback) => {
    db.query(
      "Insert into optical_software.opt_contact_len SET ?",
      customermeddeatils,
      callback
    );
  },
  update: (id, customer, callback) => {
    db.query(
      "Update optical_software.reading_total_opt SET ? where rto_id = ?",
      [customer, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query(
      "Delete from optical_software.reading_total_opt where rto_id = ? ",
      [id],
      callback
    );
  },
  getByCustomerRxId: (date, ccmd_id, cid, callback) => {
    db.query(
      "select * from optical_software.reading_total_opt where date = ? and rto_id = ? and cid = ?",
      [date, ccmd_id, cid],
      callback
    );
  },
  getAllAssistanceInvoicesMedicalDeatilsForRX: (
    cmd_id,
    cid,
    date,
    callback
  ) => {
    db.query(
      "select * from optical_software.reading_total_opt where ccmd_id = ? and cid = ? and date = ? ",
      [cmd_id, cid, date],
      callback
    );
  },

  getOptCushistory: (
    cmd_id,
    date,
    callback
  ) => {
    db.query(
      "select * from optical_software.reading_total_opt where ccmd_id = ? and date = ? ",
      [cmd_id, date],
      callback
    );
  },

  getOptCushistorySec: (
    cmd_id,
    date,
    callback
  ) => {
    db.query(
      "select * from optical_software.reading_total_un_pi_io_re_opt where date = ? and ccmd_id = ?;",
      [date, cmd_id],
      callback
    );
  },

  getOptCushistoryThird: (
    cmd_id,
    date,
    callback
  ) => {
    db.query(
      "select * from optical_software.reading_total_opt_second where date = ? and ccmd_id = ? ;",
      [date, cmd_id],
      callback
    );
  },

  getOptCushistoryObjective: (
    cmd_id,
    date,
    callback
  ) => {
    db.query(
      "select * from optical_software.opt_objective where date = ? and ccmd_id = ? ",
      [date, cmd_id],
      callback
    );
  },

  getOptCushistoryObjectiveRemark: (
    cmd_id,
    date,
    category,
    callback
  ) => {
    db.query(
      "select * from optical_software.opt_remarks where date = ? and ccmd_id = ? and cateogry = ?",
      [date, cmd_id, category],
      callback
    );
  },

  getOptCushistoryCOntact: (
    cmd_id,
    date,
    callback
  ) => {
    db.query(
      "select * from optical_software.opt_contact_len where date = ? and ccmd_id = ? ",
      [date, cmd_id],
      callback
    );
  },

  getOptCushistoryMore: (
    cmd_id,
    date,
    callback
  ) => {
    db.query(
      "select * from optical_software.reading_total_opt_more where date = ? and ccmd_id = ? ",
      [date, cmd_id],
      callback
    );
  },

  getByPrevValueCheck: (id, callback) => {
    db.query(
      "select * from optical_software.reading_total_opt where ccmd_id = ? ",
      [id],
      callback
    );
  },

  getByPrevValueCheck2: (id, callback) => {
    db.query(
      "select * from optical_software.reading_total_un_pi_io_re_opt where ccmd_id = ? ",
      [id],
      callback
    );
  },

  getByPrevValueCheck3: (id, callback) => {
    db.query(
      "select * from optical_software.reading_total_opt_second where ccmd_id = ? ",
      [id],
      callback
    );
  },

  getByPrevValueCheck4: (id, callback) => {
    db.query(
      "select * from optical_software.reading_total_opt_more where ccmd_id = ? ",
      [id],
      callback
    );
  },

  getByPrevValueCheck5: (id,type, callback) => {
    db.query(
      "select * from optical_software.opt_objective where ccmd_id = ? ",
      [id,type],
      callback
    );
  },

  // getByPrevValueCheck6: (id, callback) => {
  //   db.query(
  //     "select * from optical_software.opt_remarks where ccmd_id = ? ",
  //     [id],
  //     callback
  //   );
  // },

   getByPrevValueCheck7: (id, callback) => {
    db.query(
      "select * from optical_software.opt_contact_len where ccmd_id = ? ",
      [id],
      callback
    );
  },

};

module.exports = OptMedDeatilosRx;
