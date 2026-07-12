function AdminDashboard(){

    return (

        <div>

            <h1 className="admin-title">
                Admin Dashboard
            </h1>

            <div className="admin-stats">

                <div className="stat-card">

                    <h2>
                        Products
                    </h2>

                    <p>
                        Manage products
                    </p>

                </div>

                <div className="stat-card">

                    <h2>
                        Orders
                    </h2>

                    <p>
                        Manage orders
                    </p>

                </div>

                <div className="stat-card">

                    <h2>
                        Users
                    </h2>

                    <p>
                        Manage users
                    </p>

                </div>

            </div>

        </div>

    )

}

export default AdminDashboard