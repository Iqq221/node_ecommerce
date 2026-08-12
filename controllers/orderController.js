const db = require("../config/db")

// PLACE ORDER
const placeOrder = (req, res) => {

    const userId = req.user.id

    // GET USER CART
    const cartSql = `
    SELECT
    cart.product_id,
    cart.quantity,
    products.price
    FROM cart
    JOIN products
    ON cart.product_id = products.id
    WHERE cart.user_id = ?
    `

    db.query(cartSql, [userId], (err, cartItems) => {

        if(err){

            return res.status(500).json({
                message: "Database Error"
            })

        }

        // CHECK EMPTY CART
        if(cartItems.length === 0){

            return res.json({
                message: "Cart Is Empty"
            })

        }

        // CALCULATE TOTAL
        let totalAmount = 0

        cartItems.forEach(item => {

            totalAmount += item.price * item.quantity

        })

        // CREATE ORDER
        const orderSql = `
        INSERT INTO orders(user_id, total_amount)
        VALUES (?, ?)
        `

        db.query(
            orderSql,
            [userId, totalAmount],
            (err, orderResult) => {

                if(err){

                    return res.status(500).json({
                        message: "Database Error"
                    })

                }

                const orderId = orderResult.insertId

                // INSERT ORDER ITEMS
                cartItems.forEach(item => {

                    const itemSql = `
                    INSERT INTO order_items
                    (order_id, product_id, quantity, price)
                    VALUES (?, ?, ?, ?)
                    `

                    db.query(
                        itemSql,
                        [
                            orderId,
                            item.product_id,
                            item.quantity,
                            item.price
                        ]
                    )

                })

                // CLEAR CART
                const clearCartSql = `
                DELETE FROM cart
                WHERE user_id = ?
                `

                db.query(clearCartSql, [userId])

                res.json({
                    message: "Order Placed Successfully",
                    order_id: orderId,
                    total: totalAmount
                })

            }
        )

    })

}

// GET USER ORDERS
const getOrders = (req, res) => {

    const userId = req.user.id

    const sql = `
    SELECT * FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
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
// GET ALL ORDERS (ADMIN)
const getAllOrders =
(req, res) => {

    try{

        const sql =
        `
        SELECT
        orders.*,
        users.name,
        users.email

        FROM orders

        JOIN users
        ON orders.user_id = users.id

        ORDER BY orders.id DESC
        `

        db.query(
            sql,

            (err, result) => {

                if(err){

                    return res.status(500).json({

                        message:
                        "Database Error"

                    })

                }

                res.json(result)

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
// UPDATE ORDER STATUS
const updateOrderStatus =
(req, res) => {

    try{

        const orderId =
        req.params.id

        const { status } =
        req.body

        const sql =
        `
        UPDATE orders
        SET status = ?
        WHERE id = ?
        `

        db.query(
            sql,
            [status, orderId],

            (err, result) => {

                if(err){

                    return res.status(500).json({

                        message:
                        "Database Error"

                    })

                }

                res.json({

                    message:
                    "Order Status Updated"

                })

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

// GET ORDER ITEMS
const getOrderItems = (req, res) => {
    const orderId = req.params.id

    const sql = `
    SELECT
    order_items.id,
    order_items.quantity,
    order_items.price,
    products.name,
    products.image
    FROM order_items
    JOIN products ON order_items.product_id = products.id
    WHERE order_items.order_id = ?
    `

    db.query(sql, [orderId], (err, result) => {
        if(err){
            return res.status(500).json({ message: "Database Error" })
        }
        res.json(result)
    })
}

module.exports = {
    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,
    getOrderItems
}