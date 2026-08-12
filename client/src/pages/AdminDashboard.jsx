import { Link } from "react-router-dom"

function AdminDashboard() {
    return (
        <div className="admin-dashboard-page">
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="admin-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🛍️</div>
                    <h2>Product Catalog</h2>
                    <p>Add, edit, or toggle availability of products in your store.</p>
                    <Link to="/admin/products" className="btn btn-primary">
                        Manage Products →
                    </Link>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <h2>Customer Orders</h2>
                    <p>Review customer orders, update tracking status, and manage deliveries.</p>
                    <Link to="/admin/orders" className="btn btn-primary">
                        Manage Orders →
                    </Link>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">➕</div>
                    <h2>Add Product</h2>
                    <p>Create new product listings with custom pricing, categories, and image upload.</p>
                    <Link to="/admin/add-product" className="btn btn-secondary">
                        Create Product →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard