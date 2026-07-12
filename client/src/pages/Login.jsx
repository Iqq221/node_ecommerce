import { useState }

from "react"

import { useNavigate }

from "react-router-dom"

function Login(){

    const navigate = useNavigate()

    // STATE
    const [email, setEmail] =
    useState("")

    const [password, setPassword] =
    useState("")

    // LOGIN
    async function handleLogin(e){

        e.preventDefault()

        try{

            const response =
            await fetch(
                "http://localhost:3000/users/login",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify({

                        email,
                        password

                    })

                }
            )

           const data =
await response.json()

// LOGIN FAILED
if(!response.ok){

    alert(data.message)

    return

}

// SAVE TOKEN
localStorage.setItem(
    "token",
    data.token
)

alert(data.message)

navigate("/")

        }
        catch(error){

            console.log(error)

        }

    }

    return (

        <div className="auth-page">

            <form
            className="auth-form"

            onSubmit={handleLogin}>

                <h1>
                    Login
                </h1>

                <input
                type="email"

                placeholder="Enter Email"

                value={email}

                onChange={(e) =>
                setEmail(e.target.value)
                }
                />

                <input
                type="password"

                placeholder="Enter Password"

                value={password}

                onChange={(e) =>
                setPassword(e.target.value)
                }
                />

                <button>
                    Login
                </button>

            </form>

        </div>

    )

}

export default Login