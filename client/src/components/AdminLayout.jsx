import { Link } from "react-router-dom"

function AdminLayout({ children }){

    return (

        <div className="admin-container">

            {/* SIDEBAR */}

            <div className="admin-sidebar">

                <h1>
                    Admin
                </h1>

                <Link to="/admin">
                    Dashboard
                </Link>

                <Link to="/admin/products">
                    Products
                </Link>

                <Link to="/admin/add-product">
                    Add Product
                </Link>
                <Link to="/admin/orders">
                        Orders
                </Link>

            </div>

            {/* MAIN */}

            <div className="admin-main">

                {children}

            </div>

        </div>

    )

}

export default AdminLayout