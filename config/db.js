const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "iqra123",
    database: "ecommerce"
})

connection.connect((err) => {

    if(err){
        console.log("Database Error")
    }
    else{
        console.log("Database Connected")
    }
})

module.exports = connection