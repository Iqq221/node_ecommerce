import {
    Link,
    useNavigate
}

from "react-router-dom"

function Navbar(){

    const navigate =
    useNavigate()

    // GET TOKEN
    const token =
    localStorage.getItem("token")

    // LOGOUT
    function logout(){

        localStorage.removeItem(
            "token"
        )

        navigate("/login")

    }

    return (

        <nav className="navbar">

            <div className="logo">
                ShopEase
            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/cart">
                    Cart
                </Link>

                <Link to="/orders">
                    Orders
                </Link>

                {
                    token ? (
                        <>
                        <Link to="/profile">
                            Profile
                        </Link>
                        <button
                        className="logout-btn"

                        onClick={logout}>

                            Logout

                        </button>
                        </>
                    ) : (

                        <>

                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>

                        </>

                    )
                }
                

            </div>

        </nav>

    )

}

export default Navbar