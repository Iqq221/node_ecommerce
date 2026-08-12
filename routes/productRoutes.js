const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")
const upload = require("../middleware/uploadMiddleware")

const {
    getProducts,
    getAllProductsAdmin,
    getSingleProduct,
    addProduct,
    updateProduct,
    toggleOutOfStock,
    deleteProduct
} = require("../controllers/productController")

// GET ALL PRODUCTS (Public)
router.get("/", getProducts)

// GET ALL PRODUCTS (Admin view)
router.get("/all", authMiddleware, adminMiddleware, getAllProductsAdmin)

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

// TOGGLE OUT OF STOCK
router.put(
    "/out-of-stock/:id",
    authMiddleware,
    adminMiddleware,
    toggleOutOfStock
)

// UPDATE PRODUCT
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
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