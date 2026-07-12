import { Navigate }
from "react-router-dom"

function AdminRoute({ children }){

    const token =
    localStorage.getItem("token")

    // NO LOGIN
    if(!token){

        return <Navigate to="/login" />

    }

    // GET TOKEN DATA
    const payload =
    JSON.parse(
        atob(
            token.split(".")[1]
        )
    )

    // NOT ADMIN
    if(payload.role !== "admin"){

        return <Navigate to="/" />

    }

    return children

}

export default AdminRoute