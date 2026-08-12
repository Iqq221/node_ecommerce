import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedOrder, setExpandedOrder] = useState(null)
    const [orderItemsMap, setOrderItemsMap] = useState({})

    async function getOrders() {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3000/orders", {
                headers: {
                    Authorization: token
                }
            })

            const data = await response.json()
            if (Array.isArray(data)) {
                setOrders(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function toggleOrderDetails(orderId) {
        if (expandedOrder === orderId) {
            setExpandedOrder(null)
            return
        }

        setExpandedOrder(orderId)

        if (!orderItemsMap[orderId]) {
            try {
                const token = localStorage.getItem("token")
                const response = await fetch(`http://localhost:3000/orders/${orderId}/items`, {
                    headers: {
                        Authorization: token
                    }
                })
                const items = await response.json()
                setOrderItemsMap((prev) => ({ ...prev, [orderId]: items }))
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    if (loading) {
        return <div className="page-loading">Loading your order history...</div>
    }

    return (
        <div className="orders-page">
            <h1 className="page-title">My Orders</h1>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h2>No Orders Found</h2>
                    <p>You haven't placed any orders yet. Explore our products and place your first order!</p>
                    <Link to="/" className="btn btn-primary">Browse Products</Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => {
                        const dateFormatted = order.created_at
                            ? new Date(order.created_at).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric"
                              })
                            : "Recent"

                        const isExpanded = expandedOrder === order.id
                        const items = orderItemsMap[order.id] || []

                        return (
                            <div className="order-card" key={order.id}>
                                <div className="order-header" onClick={() => toggleOrderDetails(order.id)}>
                                    <div className="order-main-info">
                                        <span className="order-id">Order #{order.id}</span>
                                        <span className="order-date">{dateFormatted}</span>
                                    </div>

                                    <div className="order-meta">
                                        <span className={`status-badge ${order.status ? order.status.toLowerCase().replace(/\s+/g, '-') : 'processing'}`}>
                                            {order.status || 'Processing'}
                                        </span>
                                        <span className="order-price">₹{Number(order.total_amount || order.total || 0).toFixed(2)}</span>
                                        <button className="btn-toggle-details">
                                            {isExpanded ? "Hide Details ▲" : "View Items ▼"}
                                        </button>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="order-details-body">
                                        <h4>Items in this Order</h4>
                                        {items.length === 0 ? (
                                            <p className="loading-sub">Loading items...</p>
                                        ) : (
                                            <div className="order-items-grid">
                                                {items.map((item) => (
                                                    <div className="order-item-row" key={item.id}>
                                                        <img
                                                            src={
                                                                item.image
                                                                    ? `http://localhost:3000/uploads/${item.image}`
                                                                    : "https://via.placeholder.com/60"
                                                            }
                                                            alt={item.name}
                                                            className="order-item-img"
                                                        />
                                                        <div className="order-item-info">
                                                            <h5>{item.name}</h5>
                                                            <p>Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}</p>
                                                        </div>
                                                        <div className="order-item-subtotal">
                                                            ₹{(item.quantity * item.price).toFixed(2)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Orders