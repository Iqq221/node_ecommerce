
require("./config/db")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
// Import Routes
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")

// Use Routes
app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes)
app.use("/uploads", express.static("uploads"))

app.get("/", (req, res) => {
    res.send("E-commerce Backend Running")
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})