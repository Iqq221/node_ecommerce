import { Navigate }

from "react-router-dom"

function ProtectedRoute({ children }){

    // CHECK TOKEN
    const token =
    localStorage.getItem("token")

    // NOT LOGGED IN
    if(!token){

        return <Navigate to="/login" />

    }

    // LOGGED IN
    return children

}

export default ProtectedRoute