const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware =require("../middleware/adminMiddleware")
const {
    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus

} = require("../controllers/orderController")

// PLACE ORDER
router.post(
    "/",
    authMiddleware,
    placeOrder
)

// GET USER ORDERS
router.get(
    "/",
    authMiddleware,
    getOrders
)
// ADMIN GET ALL ORDERS
router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    getAllOrders
)
// UPDATE STATUS
router.put(
    "/status/:id",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
)

module.exports = router