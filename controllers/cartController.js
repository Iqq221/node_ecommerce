const db = require("../config/db")


// ADD TO CART
const addToCart = (req, res) => {

    try{

        const userId = req.user.id

        const {
            product_id,
            quantity
        } = req.body

        // CHECK IF PRODUCT ALREADY EXISTS
        const checkSql =
        `
        SELECT * FROM cart
        WHERE user_id = ?
        AND product_id = ?
        `

        db.query(
            checkSql,
            [userId, product_id],

            (err, result) => {

                if(err){

                    return res.status(500).json({
                        message:
                        "Database Error"
                    })

                }

                // PRODUCT ALREADY EXISTS
                if(result.length > 0){

                    const currentQty =
                    result[0].quantity

                    const newQty =
                    currentQty + quantity

                    const updateSql =
                    `
                    UPDATE cart
                    SET quantity = ?
                    WHERE user_id = ?
                    AND product_id = ?
                    `

                    db.query(
                        updateSql,
                        [
                            newQty,
                            userId,
                            product_id
                        ],

                        (err, updateResult) => {

                            if(err){

                                return res.status(500).json({
                                    message:
                                    "Update Error"
                                })

                            }

                            res.json({
                                message:
                                "Cart Quantity Updated"
                            })

                        }

                    )

                }

                // NEW PRODUCT
                else{

                    const insertSql =
                    `
                    INSERT INTO cart
                    (
                        user_id,
                        product_id,
                        quantity
                    )
                    VALUES (?, ?, ?)
                    `

                    db.query(
                        insertSql,
                        [
                            userId,
                            product_id,
                            quantity
                        ],

                        (err, insertResult) => {

                            if(err){

                                return res.status(500).json({
                                    message:
                                    "Insert Error"
                                })

                            }

                            res.json({
                                message:
                                "Product Added To Cart"
                            })

                        }

                    )

                }

            }

        )

    }
    catch(error){

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// GET USER CART
const getCart = (req, res) => {

    const userId = req.user.id

    const sql = `
    SELECT
    cart.id,
    products.name,
    products.price,
    products.image,
    cart.quantity
    FROM cart
    JOIN products
    ON cart.product_id = products.id
    WHERE cart.user_id = ?
    `

    db.query(sql, [userId], (err, result) => {

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

// UPDATE QUANTITY
const updateCartQuantity = (req, res) => {

    const cartId = req.params.id

    const { quantity } = req.body

    const sql = `
    UPDATE cart
    SET quantity = ?
    WHERE id = ?
    `

    db.query(
        sql,
        [quantity, cartId],
        (err, result) => {

            if(err){

                res.status(500).json({
                    message: "Database Error"
                })

            }
            else{

                res.json({
                    message: "Quantity Updated"
                })

            }

        }
    )

}

// REMOVE FROM CART
const removeFromCart = (req, res) => {

    const cartId = req.params.id

    const sql = `
    DELETE FROM cart
    WHERE id = ?
    `

    db.query(sql, [cartId], (err, result) => {

        if(err){

            res.status(500).json({
                message: "Database Error"
            })

        }
        else{

            res.json({
                message: "Item Removed From Cart"
            })

        }

    })

}

module.exports = {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart
}