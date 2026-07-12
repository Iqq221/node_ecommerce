const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart
} = require("../controllers/cartController")

// ADD TO CART
router.post(
    "/",
    authMiddleware,
    addToCart
)

// GET USER CART
router.get(
    "/",
    authMiddleware,
    getCart
)

// UPDATE QUANTITY
router.put(
    "/:id",
    authMiddleware,
    updateCartQuantity
)

// REMOVE ITEM
router.delete(
    "/:id",
    authMiddleware,
    removeFromCart
)

module.exports = router