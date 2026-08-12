import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Cart() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [placingOrder, setPlacingOrder] = useState(false)
    const [message, setMessage] = useState("")

    async function getCart() {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3000/cart", {
                headers: {
                    Authorization: token
                }
            })

            const data = await response.json()
            if (Array.isArray(data)) {
                setCartItems(data)
            } else {
                setCartItems([])
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function removeItem(cartId) {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:3000/cart/${cartId}`, {
                method: "DELETE",
                headers: {
                    Authorization: token
                }
            })

            const data = await response.json()
            setMessage(data.message)
            setTimeout(() => setMessage(""), 3000)
            getCart()
        } catch (error) {
            console.log(error)
        }
    }

    async function updateQuantity(cartId, quantity) {
        if (quantity < 1) return

        try {
            const token = localStorage.getItem("token")
            await fetch(`http://localhost:3000/cart/${cartId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ quantity })
            })
            getCart()
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCheckout() {
        if (cartItems.length === 0) return

        setPlacingOrder(true)
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })

            const data = await response.json()
            if (response.ok) {
                setMessage("🎉 Order Placed Successfully!")
                setTimeout(() => {
                    navigate("/orders")
                }, 1500)
            } else {
                setMessage(data.message || "Failed to place order")
            }
        } catch (error) {
            console.log(error)
            setMessage("Error placing order")
        } finally {
            setPlacingOrder(false)
        }
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    useEffect(() => {
        getCart()
    }, [])

    if (loading) {
        return <div className="page-loading">Loading your cart...</div>
    }

    return (
        <div className="cart-page">
            <h1 className="page-title">Shopping Cart</h1>

            {message && <div className="alert-banner success">{message}</div>}

            {cartItems.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🛒</div>
                    <h2>Your Cart is Empty</h2>
                    <p>Looks like you haven't added any products to your cart yet.</p>
                    <Link to="/" className="btn btn-primary">Start Shopping</Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div className="cart-card" key={item.id}>
                                <img
                                    src={
                                        item.image
                                            ? `http://localhost:3000/uploads/${item.image}`
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt={item.name}
                                    className="cart-img"
                                />

                                <div className="cart-content">
                                    <h3 className="cart-item-title">{item.name}</h3>
                                    <p className="cart-item-price">₹{Number(item.price).toFixed(2)}</p>

                                    <div className="quantity-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="qty-val">{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-total">
                                    <p className="item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    <button className="btn btn-danger-sm" onClick={() => removeItem(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary-card">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free-badge">FREE</span>
                        </div>
                        <hr />
                        <div className="summary-row grand-total">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <button
                            className="btn btn-checkout"
                            onClick={handleCheckout}
                            disabled={placingOrder}
                        >
                            {placingOrder ? "Processing..." : "Proceed to Checkout"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart