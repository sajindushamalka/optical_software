const USER = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET_01 = process.env.JWT_SECRET;

exports.getAllUser = (req,res) => {
    USER.getAll((err,result) => {
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
}

exports.getUserByID = (req,res) => {
    const {id} = req.params;
    USER.getById(id, (err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.lenght == 0) return res.status(404).json({message:"User Not Found"});
        res.json(result[0]);
    })
}

exports.createUser = (req, res) => {
    const newUser = req.body;

    USER.getUserByUserName(newUser.username, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length != 0) return res.status(400).json({ message: "Username already exists" });

        // Hash password
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) return res.status(500).json({ err: err.message });

            newUser.password = hash; // replace plain password with hashed password
            USER.create(newUser, (err, result) => {
                if (err) return res.status(500).json({ err: err.message });
                res.status(201).json({ message: "User Created" });
            });
        });
    });
};

exports.updateUser = (req,res) => {
    const {id} = req.params;
    const updateU = req.body;

    USER.update(id,updateU,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json(this.updateU)
    })
}

exports.deleteUser = (req,res) => {
    const {id} = req.params;
    USER.delete(id,(err,result) => {
        if(err) return res.status(500).json({err:err.message});
        if(result.affectedRows === 0) return res.status(404).json({message:"User Not Found"});
        res.json({message:"User Deleted"})
    })
}

exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    USER.getUserByUserName(username, (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (result.length === 0) return res.status(404).json({ message: "User not found" });

        const user = result[0];

        // Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ err: err.message });
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            // Create JWT Token
            const token = jwt.sign(
                { id: user.u_id, user: user }, 
                JWT_SECRET_01,
                { expiresIn: '1h' } // token valid for 1 hour
            );

            res.json({ message: "Login successful", token, user:user });
        });
    });
};
