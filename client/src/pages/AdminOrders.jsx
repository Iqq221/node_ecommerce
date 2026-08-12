import { useEffect, useState } from "react"

function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    async function getOrders() {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3000/orders/admin", {
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

    async function updateStatus(id, status) {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:3000/orders/status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ status })
            })

            const data = await response.json()
            setMessage(data.message)
            setTimeout(() => setMessage(""), 3000)
            getOrders()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    if (loading) {
        return <div className="page-loading">Loading customer orders...</div>
    }

    return (
        <div className="admin-page-container">
            <h1 className="admin-title">Manage Customer Orders</h1>

            {message && <div className="alert-banner success">{message}</div>}

            {orders.length === 0 ? (
                <div className="empty-state">
                    <p>No orders placed yet.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th>Current Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <strong>#{order.id}</strong>
                                    </td>

                                    <td>{order.name || 'Guest User'}</td>

                                    <td>{order.email}</td>

                                    <td className="price-tag">
                                        ₹{Number(order.total_amount || order.total || 0).toFixed(2)}
                                    </td>

                                    <td>
                                        <span className={`status-badge ${order.status ? order.status.toLowerCase().replace(/\s+/g, '-') : 'processing'}`}>
                                            {order.status || 'Processing'}
                                        </span>
                                    </td>

                                    <td>
                                        <select
                                            value={order.status || 'Processing'}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            style={{
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '6px',
                                                background: '#0f172a',
                                                color: '#fff',
                                                border: '1px solid #334155'
                                            }}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Out For Delivery">Out For Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminOrders