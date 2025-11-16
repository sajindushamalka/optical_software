const NewCustomersMedDeatilsModel = require("../models/NewCustomerReport.js");


exports.updateStatusCashierStatusCon = (req, res) => {
    const { id } = req.params;
    console.log(id)
    NewCustomersMedDeatilsModel.updateStatusCashierStatus(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.updateStatusCashierStatusAdvanceCon = (req, res) => {
    const { id } = req.params;
    console.log(id)
    NewCustomersMedDeatilsModel.updateStatusCashierStatusAdvance(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.getCustomerRecForCashierCon = (req, res) => {
    NewCustomersMedDeatilsModel.getCustomerRecForCashier((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

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

// exports.createAssistanceSecondCon = (req, res) => {
//     const newUser = req.body;
//     console.log(newUser)
//     NewCustomersMedDeatilsModel.getBycreateAssistanceSecond(newUser.cmd_id, (err, result) => {
//         if (err) return res.status(500).json({ err: err.message });
//         console.log(result.length);
//         if (result.length != 0) return res.status(400).json({ message: "Username already enter data" });
//         NewCustomersMedDeatilsModel.createAssistanceSecond(newUser, (err, result) => {
//             if (err) return res.status(500).json({ err: err.message });
//             res.status(201).json({ message: "Order Created", id: result.insertId });
//         });
//     })
// };
exports.createAssistanceSecondCon = (req, res) => {
    const newUser = req.body;
    console.log("Incoming data:", newUser);

    NewCustomersMedDeatilsModel.getBycreateAssistanceSecond(newUser.cmd_id, (err, result) => {
        if (err) {
            console.error("Error in getBycreateAssistanceSecond:", err);
            return res.status(500).json({ err: err.message });
        }

        console.log("Existing records count:", result.length);

        if (result.length !== 0) {
            return res.status(400).json({ message: "Username already enter data" });
        }

        NewCustomersMedDeatilsModel.createAssistanceSecond(newUser, (err, result) => {
            if (err) {
                console.error("Error in createAssistanceSecond:", err);
                return res.status(500).json({ err: err.message });
            }

            console.log("Create result:", result);
            res.status(201).json({ message: "Order Created", id: result.insertId });
        });
    });
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

exports.createCashierInvoiceCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.createCashierInvoice(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "Order Created", id: result.insertId });
    });
};

exports.createCashierInvoiceTableItemsCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.createCashierInvoiceTableItems(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "Order Created", id: result.insertId });
    });
};

exports.getCustomerRecForComplateCon = (req, res) => {
    NewCustomersMedDeatilsModel.getCustomerRecForComplate((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.getAdvancepayamentOnlyCon = (req, res) => {
    NewCustomersMedDeatilsModel.getAdvancepayamentOnly((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.getAllOptimsitricRecordsCon = (req, res) => {
    NewCustomersMedDeatilsModel.getAllOptimsitricRecords((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.getUploadedFilesNameOnlyCon = (req, res) => {
    const i1 = req.body.id;
    const i2 = req.body.id2;
    NewCustomersMedDeatilsModel.getUploadedFilesNameOnly(i1, i2, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

exports.getBrokenOrdersCon = (req, res) => {
    NewCustomersMedDeatilsModel.getBrokenOrders((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.updateAssistanceDetilsCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;

    NewCustomersMedDeatilsModel.updateAssistanceDetils(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.updateCustomeDetailsCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;

    NewCustomersMedDeatilsModel.updateCustomeDetails(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.getCustomerRecForPrescriptionCon = (req, res) => {
    NewCustomersMedDeatilsModel.getCustomerRecForPrescription((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.updateStatusTOfactoryCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.updateStatusTOfactory(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.getCustomerFactoryDetailsCon = (req, res) => {
    NewCustomersMedDeatilsModel.getCustomerFactoryDetails((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}

exports.updateStatusfactoryProceesingCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.updateStatusfactoryProceesing(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.updateStatusfactorytextCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body.factory_remark;
    NewCustomersMedDeatilsModel.updateStatusfactorytext(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}


exports.getJobStatusDeatilsCon = (req, res) => {
    NewCustomersMedDeatilsModel.getJobStatusDeatils((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
}


exports.updateJobStatusCon = (req, res) => {
    const { id } = req.params;
    const rd = req.body.removeDate;
    const nt = req.body.selectedNotifications;
    const nd = req.body.notificationDate;
    const js = req.body.selectedJobStatus;
    console.log(rd, nt, nd, js, id)
    NewCustomersMedDeatilsModel.updateJobStatus(rd, nt, nd, js, id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.finishOrderCon = (req, res) => {
    const { id } = req.params;
    console.log(id)
    NewCustomersMedDeatilsModel.finishOrder(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.createCashierInvoiceReciptCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.createCashierInvoiceRecipt(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "Order Created", id: result.insertId });
    });
};

exports.getPartialPaymentAmountCon = (req, res) => {
    const { id } = req.params;
    NewCustomersMedDeatilsModel.getPartialPaymentAmount(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result[0]);
    })
}

exports.getInvoiceReportCon = (req, res) => {
    NewCustomersMedDeatilsModel.getInvoiceReport((err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result);
    })
}

exports.getInvoiceRecepitCon = (req, res) => {
    NewCustomersMedDeatilsModel.getInvoiceRecepit((err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result);
    })
}

exports.getInvoiceByIDCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getInvoiceByID(newUser.id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result[0]);
    })
}

exports.getInvoiceTableByIDCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getInvoiceTableByID(newUser.id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result);
    })
}

exports.getRecepitByIDCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getRecepitByID(newUser.id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result);
    })
}

exports.getCusomtwrByIDCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getCusomtwrByID(newUser.id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result[0]);
    })
}

exports.getJobByIDCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getJobByID(newUser.id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result[0]);
    })
}

exports.createReorderMessageCon = (req, res) => {
    const newUser = req.body;
    NewCustomersMedDeatilsModel.createReorderMessage(newUser, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.status(201).json({ message: "Order Created", id: result.insertId });
    });
};

exports.updateOptimisticDeatilsCon = (req, res) => {
    const { id } = req.params;
    const updateU = req.body;
    console.log(id, updateU)

    NewCustomersMedDeatilsModel.updateOptimisticDeatils(id, updateU, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "User Not Found" });
        res.json(this.updateU)
    })
}

exports.updateOptimisticObjectiveDeatilsCon = (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getDeatilsByIDObj(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length == 0)
            return (
                NewCustomersMedDeatilsModel.optimizer_objective_create(newUser, (err, result) => {
                    if (err) return res.status(500).json({ err: err.message });
                    console.log(result)
                    res.status(201).json({ message: "User Created" });
                }))
        NewCustomersMedDeatilsModel.updateOptimisticObjectiveDeatils(id, newUser, (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            console.log(result)
            res.status(201).json({ message: "User Updated" });
        });
    });
};


exports.updateOptimisticCOntactDeatilsCon = (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    NewCustomersMedDeatilsModel.getDeatilsByIDCOntactLens(id, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length == 0)
            return (
                NewCustomersMedDeatilsModel.optimizer_contact_lenses_create(newUser, (err, result) => {
                    if (err) return res.status(500).json({ err: err.message });
                    console.log(result)
                    res.status(201).json({ message: "User Created" });
                }))
        NewCustomersMedDeatilsModel.updateOptimisticCOntactDeatils(id, newUser, (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            console.log(result)
            res.status(201).json({ message: "User Updated" });
        });
    });
};


exports.getLastInvoiceNoCon = (req, res) => {
    NewCustomersMedDeatilsModel.getLastInvoiceNo((err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result[0]);
    })
}

exports.getLastReciptNoCon = (req, res) => {
    NewCustomersMedDeatilsModel.getLastReciptNo((err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        res.json(result[0]);
    })
}