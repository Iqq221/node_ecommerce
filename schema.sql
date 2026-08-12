-- E-Commerce Database Schema and Seed Data

CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
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

-- 3. Cart Table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Seed Data (Sample Products)
INSERT IGNORE INTO products (id, name, price, description, category, stock, stock_status, image) VALUES
(1, 'Premium Wireless Headphones', 2999.00, 'High-quality noise-canceling over-ear wireless headphones with deep bass.', 'Electronics', 15, 'in_stock', 'headphones.jpg'),
(2, 'Classic Leather Jacket', 4999.00, 'Stylish black genuine leather jacket for everyday outerwear.', 'Clothing', 8, 'in_stock', 'jacket.jpg'),
(3, 'Minimalist Watch', 1499.00, 'Sleek stainless steel analog wrist watch with a minimalist dial.', 'Accessories', 20, 'in_stock', 'watch.jpg'),
(4, 'Canvas Travel Backpack', 1999.00, 'Durable water-resistant canvas backpack for travel and daily carry.', 'Bags', 12, 'in_stock', 'backpack.jpg'),
(5, 'Running Sneakers', 2499.00, 'Lightweight breathable mesh athletic shoes for optimal comfort.', 'Footwear', 10, 'in_stock', 'sneakers.jpg');
