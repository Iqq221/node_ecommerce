const express = require("express")

const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} = require("../controllers/userController")
// REGISTER
router.post("/register", registerUser)

// LOGIN
router.post("/login", loginUser)

// PROFILE
router.get(
    "/profile",
    authMiddleware,
    getProfile
)
// UPDATE PROFILE
router.put(
    "/profile",
    authMiddleware,
    updateProfile
)

module.exports = router