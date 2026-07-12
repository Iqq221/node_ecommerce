const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const adminMiddleware = require("../middleware/adminMiddleware")
const upload = require("../middleware/uploadMiddleware")

const {
    getProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController")

// GET ALL PRODUCTS
router.get("/", getProducts)

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct)

// ADD PRODUCT
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    addProduct
)

// UPDATE PRODUCT
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateProduct
)

// DELETE PRODUCT
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
)

module.exports = router