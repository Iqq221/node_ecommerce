const db = require("../config/db")

function validateProduct({ name, price, description, category, stock, stock_status }) {
    if (typeof name !== "string" || name.trim().length < 3) return "Product name must be at least 3 characters long"
    if (!Number.isFinite(Number(price)) || Number(price) <= 0) return "Price must be greater than 0"
    if (typeof category !== "string" || category.trim().length < 2) return "Please provide a valid category"
    if (typeof description !== "string" || description.trim().length < 10) return "Description must be at least 10 characters long"
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) return "Stock must be a whole number of 0 or more"
    if (stock_status && !["in_stock", "out_of_stock"].includes(stock_status)) return "Invalid stock status"
    return null
}

// GET ALL PRODUCTS (Customer view - only in stock)
const getProducts = (req, res) => {
    const sql = "SELECT * FROM products WHERE stock_status = 'in_stock' OR stock_status IS NULL"

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).json({ message: "Database Error" })
        }
        else{
            res.json(result)
        }
    })
}

// GET ALL PRODUCTS ADMIN (Includes out of stock)
const getAllProductsAdmin = (req, res) => {
    const sql = "SELECT * FROM products"

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).json({ message: "Database Error" })
        }
        else{
            res.json(result)
        }
    })
}

// GET SINGLE PRODUCT
const getSingleProduct = (req, res) => {
    try{
        const productId = req.params.id

        const sql = `SELECT * FROM products WHERE id = ?`

        db.query(sql, [productId], (err, result) => {
            if(err){
                return res.status(500).json({ message: "Database Error" })
            }
            if(result.length === 0){
                return res.status(404).json({ message: "Product Not Found" })
            }
            res.json(result[0])
        })
    }
    catch(error){
        res.status(500).json({ message: "Server Error" })
    }
}

// ADD PRODUCT
const addProduct = (req, res) => {
    const { name, price, description, category, stock } = req.body
    const image = req.file ? req.file.filename : (req.body.image || null)
    const validationError = validateProduct({ name, price, description, category, stock })
    if (validationError) return res.status(400).json({ message: validationError })
    if (!image) return res.status(400).json({ message: "A product image is required" })

    const sql = `
    INSERT INTO products (name, price, description, image, category, stock, stock_status)
    VALUES (?, ?, ?, ?, ?, ?, 'in_stock')
    `

    db.query(sql, [name.trim(), Number(price), description.trim(), image, category.trim(), Number(stock)], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({ message: "Database Error" })
        }
        else{
            res.json({ message: "Product Added Successfully" })
        }
    })
}

// UPDATE PRODUCT
const updateProduct = (req, res) => {
    const productId = req.params.id
    const { name, price, description, category, stock, stock_status } = req.body
    const validationError = validateProduct({ name, price, description, category, stock, stock_status })
    if (validationError) return res.status(400).json({ message: validationError })
    
    // Check if a new file was uploaded, otherwise keep old image or use provided image string
    let newImage = req.file ? req.file.filename : (req.body.image || null)

    if (newImage) {
        const sql = `
        UPDATE products
        SET name = ?, price = ?, description = ?, image = ?, category = ?, stock = ?, stock_status = ?
        WHERE id = ?
        `
        db.query(sql, [name.trim(), Number(price), description.trim(), newImage, category.trim(), Number(stock), stock_status || 'in_stock', productId], (err, result) => {
            if(err){
                return res.status(500).json({ message: "Database Error" })
            }
            res.json({ message: "Product Updated Successfully" })
        })
    } else {
        const sql = `
        UPDATE products
        SET name = ?, price = ?, description = ?, category = ?, stock = ?, stock_status = ?
        WHERE id = ?
        `
        db.query(sql, [name.trim(), Number(price), description.trim(), category.trim(), Number(stock), stock_status || 'in_stock', productId], (err, result) => {
            if(err){
                return res.status(500).json({ message: "Database Error" })
            }
            res.json({ message: "Product Updated Successfully" })
        })
    }
}

// TOGGLE OUT OF STOCK
const toggleOutOfStock = (req, res) => {
    const productId = req.params.id

    const checkSql = "SELECT stock_status FROM products WHERE id = ?"
    db.query(checkSql, [productId], (err, result) => {
        if(err || result.length === 0){
            return res.status(500).json({ message: "Database Error or Product Not Found" })
        }

        const currentStatus = result[0].stock_status
        const newStatus = currentStatus === 'out_of_stock' ? 'in_stock' : 'out_of_stock'

        const sql = "UPDATE products SET stock_status = ? WHERE id = ?"
        db.query(sql, [newStatus, productId], (err, updateResult) => {
            if(err){
                return res.status(500).json({ message: "Database Error" })
            }
            res.json({ message: `Product marked as ${newStatus}` })
        })
    })
}

// DELETE PRODUCT
const deleteProduct = (req, res) => {
    const productId = req.params.id

    const sql = "DELETE FROM products WHERE id = ?"

    db.query(sql, [productId], (err, result) => {
        if(err){
            res.status(500).json({ message: "Database Error" })
        }
        else{
            res.json({ message: "Product Deleted Successfully" })
        }
    })
}

module.exports = {
    getProducts,
    getAllProductsAdmin,
    getSingleProduct,
    addProduct,
    updateProduct,
    toggleOutOfStock,
    deleteProduct
}
