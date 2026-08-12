import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function AdminProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    async function getProducts() {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3000/products/all", {
                headers: {
                    Authorization: token
                }
            })

            const data = await response.json()
            if (Array.isArray(data)) {
                setProducts(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function toggleStock(id) {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:3000/products/out-of-stock/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: token
                }
            })

            const data = await response.json()
            setMessage(data.message)
            setTimeout(() => setMessage(""), 3000)
            getProducts()
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteProduct(id) {
        if (!window.confirm("Are you sure you want to delete this product?")) return

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: token
                }
            })

            const data = await response.json()
            setMessage(data.message)
            setTimeout(() => setMessage(""), 3000)
            getProducts()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    if (loading) {
        return <div className="page-loading">Loading catalog...</div>
    }

    return (
        <div className="admin-page-container">
            <div className="admin-header-flex">
                <h1 className="admin-title">Manage Catalog Products</h1>
                <Link to="/admin/add-product" className="btn btn-primary">
                    + Add New Product
                </Link>
            </div>

            {message && <div className="alert-banner success">{message}</div>}

            {products.length === 0 ? (
                <div className="empty-state">
                    <p>No products found in database.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Details</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img
                                            src={
                                                product.image
                                                    ? `http://localhost:3000/uploads/${product.image}`
                                                    : "https://via.placeholder.com/80"
                                            }
                                            alt={product.name}
                                            className="admin-product-img"
                                        />
                                    </td>

                                    <td>
                                        <strong className="product-table-name">{product.name}</strong>
                                        <p className="product-table-desc">{product.description}</p>
                                    </td>

                                    <td>
                                        <span className="category-badge">{product.category || 'General'}</span>
                                    </td>

                                    <td className="price-tag">
                                        ₹{Number(product.price).toFixed(2)}
                                    </td>

                                    <td>
                                        <span className={`status-badge ${product.stock_status === 'out_of_stock' ? 'cancelled' : 'delivered'}`}>
                                            {product.stock_status === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="action-buttons-flex">
                                            <Link
                                                to={`/admin/edit-product/${product.id}`}
                                                className="btn btn-sm btn-edit"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className={`btn btn-sm ${product.stock_status === 'out_of_stock' ? 'btn-success' : 'btn-warning'}`}
                                                onClick={() => toggleStock(product.id)}
                                            >
                                                {product.stock_status === 'out_of_stock' ? 'Mark In Stock' : 'Mark Out of Stock'}
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
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

export default AdminProducts