const NewCustomersMedDeatilsModel = require("../models/NewCustomerReport.js");

exports.getCustomerOldRecordsCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getCustomerOldRecords(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "Details not founded" });
        res.json(result);
    })
}

exports.createCustomersMedDetails = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "Order Created", id: result.insertId });
    });
};

exports.getAllCustomersTodayDetails = (req, res) => {
    NewCustomersMedDeatilsModel.getAllTodayOrders((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}


exports.optimizer_create_con = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getByCMDId(newUser.cmd_id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
        NewCustomersMedDeatilsModel.optimizer_create(newUser, (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            res.status(201).json({ message: "Order Created", id: result.insertId });
        });
    })
};

exports.getByCMDIdCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getByCMDId(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}

exports.optimizer_objective_create_con = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getByCMDIdObjective(newUser.cmd_id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
        NewCustomersMedDeatilsModel.optimizer_objective_create(newUser, (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            res.status(201).json({ message: "Order Created", id: result.insertId });
        });
    })
};


exports.getByCMDIdObjCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getByCMDIdObjective(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}

exports.optimizer_contact_lenses_create_con = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getByCMDIdContactLenses(newUser.cmd_id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
        NewCustomersMedDeatilsModel.optimizer_contact_lenses_create(newUser, (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            res.status(201).json({ message: "Order Created", id: result.insertId });
        });
    })
};

exports.getByCMDIdContactLensesCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getByCMDIdContactLenses(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}


exports.updateStatusOptimizerCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.updateStatusOptimizer(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.uploadFiles = (req, res) => {
  const { userId, type } = req.body;
  console.log(userId, type)

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  req.files.forEach((file) => {
    const fileData = {
      cid: userId,
      type,
      file_name: file.originalname,
      file_type: file.mimetype,
      data: file.buffer,
    };

    NewCustomersMedDeatilsModel.saveFile(fileData, (err) => {
      if (err) console.error("Error saving file:", err);
    });
  });

  res.json({ message: "Files uploaded successfully" });
};

exports.getUserFiles = (req, res) => {
  const { id } = req.params;

  NewCustomersMedDeatilsModel.getFilesByUser(id, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    res.json(result);
  });
};

exports.getFileById = (req, res) => {
  const { fileId } = req.params;

  NewCustomersMedDeatilsModel.getFileById(fileId, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    if (result.length === 0) return res.status(404).json({ message: "File not found" });

    const file = result[0];
    res.setHeader("Content-Type", file.file_type);
    res.setHeader("Content-Disposition", `attachment; filename=${file.file_name}`);
    res.send(file.data);
  });

}

exports.getCustomerRecForAssistanceCon = (req, res) => {
    NewCustomersMedDeatilsModel.getCustomerRecForAssistance((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.getByIDWithOptimisticFilledCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getByIDWithOptimisticFilled(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}

exports.getByIDWithOptimisticObjectiveFilledCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getByIDWithOptimisticObjectiveFilled(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}

exports.getByIDWithOptimisticContactLensesFilledCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getByIDWithOptimisticContactLensesFilled(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}

exports.createAssistanceSecondCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getBycreateAssistanceSecond(newUser.cmd_id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
        NewCustomersMedDeatilsModel.createAssistanceSecond(newUser, (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            res.status(201).json({ message: "Order Created", id: result.insertId });
        });
    })
};

exports.updateStatusAssistacnceSecondCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.updateStatusAssistacnceSecond(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.getBycreateAssistanceSecondCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getBycreateAssistanceSecond(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.lenght == 0) return res.status(404).json({ message: "User Not Found" });
        res.json(result[0]);
    })
}

// exports.getAllCustomersMedDetails = (req,res) => {
//     CustomersMedDetails.getAll((err,result) => {
//         if(err) return res.status(500).json({error:err.message});
//         res.json(result);
//     })
// }

// exports.getCustomersMedDetailsByID = (req,res) => {
//     const {id} = req.params;
//     CustomersMedDetails.getById(id, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result[0]);
//     })
// }

// exports.createCustomersMedDetails = (req, res) => {
//     const newUser = req.body;
//     console.log(newUser)
//     CustomersMedDetails.create(newUser, (err, result) => {
//         if (err) return res.status(500).json({ err: err.message });
//         res.status(201).json({ message: "User Created", id: result.insertId });
//     });
// };

// exports.updateCustomersMedDetails = (req,res) => {
//     const {id} = req.params;
//     const updateU = req.body;

//     CustomersMedDetails.update(id,updateU,(err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
//         res.json(this.updateU)
//     })
// }

// exports.deleteCustomersMedDetails = (req,res) => {
//     const {id} = req.params;
//     CustomersMedDetails.delete(id,(err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
//         res.json({message:"User Deleted"})
//     })
// }

// exports.updateCustomersMedDetailsStatus = (req,res) => {
//     const {id} = req.params;
//     CustomersMedDetails.updateOrderStatus(id,(err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
//         res.json({message:"Success"})
//     })
// }

// exports.getAllOptomestricMedDetails = (req,res) => {
//     CustomersMedDetails.getAllOptometristOrders((err,result) => {
//         if(err) return res.status(500).json({error:err.message});
//         res.json(result);
//     })
// }

// exports.getAllAssistanceInvoiceMedDetails = (req,res) => {
//     CustomersMedDetails.getAllAssistanceInvoices((err,result) => {
//         if(err) return res.status(500).json({error:err.message});
//         res.json(result);
//     })
// }


// exports.getAllAssistanceInvoicesMedicalDeatilsForRXCon = (req,res) => {
//     const cmd_id = req.body.ccmd_id;
//     const cid = req.body.cid;
//     const date = req.body.date;
//     CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsForRX(cmd_id, cid, date, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result);
//     })
// }

// exports.getAllAssistanceInvoicesMedicalDeatilsSecondRxCon = (req,res) => {
//     const cmd_id = req.body.ccmd_id;
//     const cid = req.body.cid;
//     const date = req.body.date;
//     CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsSecondRX(cmd_id, cid, date, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result);
//     })
// }

// exports.getAllAssistanceInvoicesMedicalDeatilsUnPiIoReadingCon = (req,res) => {
//     const cmd_id = req.body.ccmd_id;
//     const cid = req.body.cid;
//     const date = req.body.date;
//     CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsUnPiIoReading(cmd_id, cid, date, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result);
//     })
// }

// exports.getAllAssistanceInvoicesMedicalDeatilsMoreCon = (req,res) => {
//     const cmd_id = req.body.ccmd_id;
//     const cid = req.body.cid;
//     const date = req.body.date;
//     CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsMore(cmd_id, cid, date, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result[0]);
//     })
// }

// exports.getAllAssistanceInvoicesMedicalDeatilsObjectiveCon = (req,res) => {
//     const cmd_id = req.body.ccmd_id;
//     const cid = req.body.cid;
//     const date = req.body.date;
//     CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsObjective(cmd_id, cid, date, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result);
//     })
// }

// exports.getAllAssistanceInvoicesMedicalDeatilsContactLenCon = (req,res) => {
//     const cmd_id = req.body.ccmd_id;
//     const cid = req.body.cid;
//     const date = req.body.date;
//     CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsContactLen(cmd_id, cid, date, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result);
//     })
// }

// exports.getAllAssistanceInvoicesMedicalDeatilsRemarksCon = (req,res) => {
//     const cmd_id = req.body.ccmd_id;
//     const cid = req.body.cid;
//     const date = req.body.date;
//     CustomersMedDetails.getAllAssistanceInvoicesMedicalDeatilsRemarks(cmd_id, cid, date, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result);
//     })
// }

// exports.updateOrderStatusToCashierCon = (req,res) => {
//     const {id} = req.params;
//     const amount = req.body.amount;
//     console.log(id,amount)
//     CustomersMedDetails.updateOrderStatusToCashier(id,amount,(err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
//         res.json({message:"Success"})
//     })
// }

// exports.getAllCashierInvoiceMedDetails = (req,res) => {
//     CustomersMedDetails.getAllCashierInvoices((err,result) => {
//         if(err) return res.status(500).json({error:err.message});
//         res.json(result);
//     })
// }

// exports.getCustomersHistory = (req,res) => {
//     const {id} = req.params;
//     CustomersMedDetails.getCustomerHistory(id, (err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
//         res.json(result);
//     })
// }

// exports.updateCashierOrderCon = (req,res) => {
//     const {id} = req.params;
//     CustomersMedDetails.updateCashierOrder(id,(err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
//         res.json({message:"Success"})
//     })
// }

// exports.updateandcomplateorderCon = (req,res) => {
//     const {id} = req.params;
//     CustomersMedDetails.updateandcomplateorder(id,(err,result) => {
//         if(err) return res.status(500).json({err:err.message});
//         if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
//         res.json({message:"Success"})
//     })
// }