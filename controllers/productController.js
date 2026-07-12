const db = require("../config/db")

// GET ALL PRODUCTS
const getProducts = (req, res) => {

    const sql = "SELECT * FROM products WHERE stock_status = 'in_stock'"

    db.query(sql, (err, result) => {

        if(err){
            res.status(500).json({
                message: "Database Error"
            })
        }
        else{
            res.json(result)
        }
    })
}

// GET SINGLE PRODUCT
// GET SINGLE PRODUCT
const getSingleProduct =
(req, res) => {

    try{

        const productId =
        req.params.id

        const sql =
        `
        SELECT * FROM products
        WHERE id = ?
        `

        db.query(
            sql,
            [productId],

            (err, result) => {

                if(err){

                    return res.status(500).json({

                        message:
                        "Database Error"

                    })

                }

                if(result.length === 0){

                    return res.status(404).json({

                        message:
                        "Product Not Found"

                    })

                }

                res.json(result[0])

            }

        )

    }
    catch(error){

        res.status(500).json({

            message:
            "Server Error"

        })

    }

}
// ADD PRODUCT
const addProduct = (req, res) => {

   const {
    name,
    price,
    description,
    category,
    stock
} = req.body

const image = req.file.filename

    const sql = `
    INSERT INTO products
    (name, price, description, image, category, stock)
    VALUES (?, ?, ?, ?, ?, ?)
    `

    db.query(
        sql,
        [name, price, description, image, category, stock],
        (err, result) => {

            if(err){
                res.status(500).json({
                    message: "Database Error"
                })
            }
            else{
                res.json({
                    message: "Product Added Successfully"
                })
            }
        }
    )
}
// UPDATE PRODUCT
const updateProduct = (req, res) => {

    const productId = req.params.id

    const {
        name,
        price,
        description,
        image,
        category,
        stock
    } = req.body

    const sql = `
    UPDATE products
    SET
    name = ?,
    price = ?,
    description = ?,
    image = ?,
    category = ?,
    stock = ?
    WHERE id = ?
    `

    db.query(
        sql,
        [
            name,
            price,
            description,
            image,
            category,
            stock,
            productId
        ],
        (err, result) => {

            if(err){

                res.status(500).json({
                    message: "Database Error"
                })

            }
            else{

                res.json({
                    message: "Product Updated Successfully"
                })

            }

        }
    )

}
//DELETE PRODUCT
const deleteProduct = (req, res) => {

    const productId = req.params.id

    const sql = "DELETE FROM products WHERE id = ?"

    db.query(sql, [productId], (err, result) => {

        if(err){

            res.status(500).json({
                message: "Database Error"
            })

        }
        else{

            res.json({
                message: "Product Deleted Successfully"
            })

        }

    })

}

module.exports = {
    getProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
}