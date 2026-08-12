import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function ProductCard({ product }) {
    const navigate = useNavigate()
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    async function addToCart(e) {
        e.preventDefault()
        e.stopPropagation()

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
                    quantity: 1
                })
            })

            if (response.ok) {
                setAdded(true)
                setTimeout(() => setAdded(false), 2000)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setAdding(false)
        }
    }

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-img-wrapper">
                <img
                    src={
                        product.image
                            ? `http://localhost:3000/uploads/${product.image}`
                            : "https://via.placeholder.com/400?text=Product+Image"
                    }
                    alt={product.name}
                    className="product-img"
                />
                {product.category && (
                    <span className="product-card-category">{product.category}</span>
                )}
            </Link>

            <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-title-link">
                    <h2>{product.name}</h2>
                </Link>

                <p className="description">{product.description}</p>

                <div className="product-card-footer">
                    <span className="price">₹{Number(product.price).toFixed(2)}</span>
                    <button
                        className={`btn-add-cart ${added ? 'btn-added' : ''}`}
                        onClick={addToCart}
                        disabled={adding}
                    >
                        {adding ? "Adding..." : added ? "Added ✓" : "Add To Cart"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard