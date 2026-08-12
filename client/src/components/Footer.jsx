import { Link } from "react-router-dom"

function Footer({ admin = false }) {
    const year = new Date().getFullYear()

    return (
        <footer className={admin ? "site-footer admin-footer" : "site-footer"}>
            <div className="footer-content">
                <div className="footer-brand">
                    <Link to={admin ? "/admin" : "/"}>ShopEase</Link>
                    <p>{admin ? "Simple tools for running your demo store." : "A simple, reliable way to discover products you will love."}</p>
                </div>
                {!admin && <div className="footer-links"><Link to="/">Shop</Link><Link to="/cart">Cart</Link><Link to="/orders">Orders</Link><Link to="/login">Sign in</Link></div>}
                <p className="footer-copy">© {year} ShopEase. Demo store.</p>
            </div>
        </footer>
    )
}

export default Footer
