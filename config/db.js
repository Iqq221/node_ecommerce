const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "iqra123",
    database: process.env.DB_NAME || "ecommerce",
    multipleStatements: true
})

connection.connect((err) => {
    if(err){
        console.log("Database Connection Error:", err.message)
    }
    else{
        console.log("Database Connected Successfully")
        initDatabase()
    }
})

const bcrypt = require("bcrypt")

function initDatabase() {
    const initSql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        category VARCHAR(100),
        stock INT DEFAULT 10,
        stock_status VARCHAR(50) DEFAULT 'in_stock',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Processing',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
    );
    `

    connection.query(initSql, async (err) => {
        if(err) {
            console.log("Error initializing database tables:", err.message)
        } else {
            console.log("Database tables verified/initialized successfully")
            seedDefaultAdmin()
        }
    })
}

async function seedDefaultAdmin() {
    const checkSql = "SELECT * FROM users WHERE role = 'admin'"
    connection.query(checkSql, async (err, result) => {
        if (!err && result.length === 0) {
            try {
                const hashedPassword = await bcrypt.hash("admin123", 10)
                const insertAdminSql = `
                INSERT INTO users (name, email, password, role)
                VALUES (?, ?, ?, 'admin')
                `
                connection.query(insertAdminSql, ["System Admin", "admin@shopease.com", hashedPassword], (err) => {
                    if (!err) {
                        console.log("Default Admin Account Created: admin@shopease.com / admin123")
                    }
                })
            } catch (e) {
                console.log("Error seeding admin user:", e.message)
            }
        }
    })
}

module.exports = connection
