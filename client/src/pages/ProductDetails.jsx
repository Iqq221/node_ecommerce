import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [adding, setAdding] = useState(false)
    const [message, setMessage] = useState("")

    async function getProduct() {
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`)
            if (!response.ok) return
            const data = await response.json()
            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function addToCart() {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        setAdding(true)
        try {
            const response = await fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: quantity
                })
            })

            const data = await response.json()
            if (response.ok) {
                setMessage("Added to Cart Successfully!")
                setTimeout(() => setMessage(""), 3000)
            } else {
                setMessage(data.message || "Failed to add item")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setAdding(false)
        }
    }

    useEffect(() => {
        getProduct()
    }, [id])

    if (!product) {
        return <div className="page-loading">Loading product details...</div>
    }

    return (
        <div className="details-page-container">
            <Link to="/" className="back-link">
                ← Back to Products
            </Link>

            {message && <div className="alert-banner success">{message}</div>}

            <div className="details-grid">
                <div className="details-image-card">
                    <img
                        src={
                            product.image
                                ? `http://localhost:3000/uploads/${product.image}`
                                : "https://via.placeholder.com/500?text=No+Image"
                        }
                        alt={product.name}
                        className="details-img"
                    />
                </div>

                <div className="details-info-card">
                    {product.category && (
                        <span className="category-pill">{product.category}</span>
                    )}

                    <h1 className="details-title">{product.name}</h1>

                    <div className="details-price">
                        ₹{Number(product.price).toFixed(2)}
                    </div>

                    <p className="details-description">{product.description}</p>

                    <div className="details-quantity-selector">
                        <label>Quantity:</label>
                        <div className="quantity-controls">
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="qty-val">{quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="details-actions">
                        <button
                            className="btn btn-primary-lg"
                            onClick={addToCart}
                            disabled={adding}
                        >
                            {adding ? "Adding..." : "🛒 Add To Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails