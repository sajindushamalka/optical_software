const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err)=>{
    if(err) return console.error(err.message);

    console.log("---------Connected Database----------")
    console.log("-------------------------------------")
})

module.exports = connection;