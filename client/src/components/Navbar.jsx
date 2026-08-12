import { Link, useNavigate, useLocation } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const token = localStorage.getItem("token")

    let isAdmin = false
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            if (payload.role === "admin") {
                isAdmin = true
            }
        } catch (e) {
            // invalid token format
        }
    }

    function logout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo-brand">
                <span className="logo-icon">🛍️</span>
                <span className="logo-text">ShopEase</span>
            </Link>

            <div className="nav-links">
                <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
                    Home
                </Link>

                <Link to="/cart" className={location.pathname === "/cart" ? "nav-link active" : "nav-link"}>
                    Cart
                </Link>

                <Link to="/orders" className={location.pathname === "/orders" ? "nav-link active" : "nav-link"}>
                    Orders
                </Link>

                {isAdmin && (
                    <Link to="/admin" className={location.pathname.startsWith("/admin") ? "nav-link admin-pill active" : "nav-link admin-pill"}>
                        ⚡ Admin Dashboard
                    </Link>
                )}

                {token ? (
                    <>
                        <Link to="/profile" className={location.pathname === "/profile" ? "nav-link active" : "nav-link"}>
                            Profile
                        </Link>
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-nav-register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar