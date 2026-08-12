import { Link, NavLink } from "react-router-dom"
import Footer from "./Footer"

function AdminLayout({ children }){

    return (

        <div className="admin-container">

            {/* SIDEBAR */}

            <div className="admin-sidebar">

                <Link to="/admin" className="admin-brand">ShopEase <span>Admin</span></Link>
                <p className="admin-sidebar-label">Store management</p>

                <nav className="admin-nav">
                    <NavLink end to="/admin">Overview</NavLink>

                    <NavLink to="/admin/products">Products</NavLink>

                    <NavLink to="/admin/add-product">Add product</NavLink>
                    <NavLink to="/admin/orders">Orders</NavLink>
                </nav>
                <Link to="/" className="admin-store-link">View storefront →</Link>

            </div>

            {/* MAIN */}

            <div className="admin-content-shell">
                <main className="admin-main">{children}</main>
                <Footer admin />
            </div>

        </div>

    )

}

export default AdminLayout
