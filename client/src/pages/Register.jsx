import { useState }

from "react"

import { useNavigate }

from "react-router-dom"

function Register(){

    const navigate = useNavigate()

    const [name, setName] =
    useState("")

    const [email, setEmail] =
    useState("")

    const [password, setPassword] =
    useState("")

    async function handleRegister(e){

        e.preventDefault()

        try{

            const response =
            await fetch(
                "http://localhost:3000/users/register",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify({

                        name,
                        email,
                        password

                    })

                }
            )

            const data =
            await response.json()

            alert(data.message)

            navigate("/login")

        }
        catch(error){

            console.log(error)

        }

    }

    return (

        <div className="auth-page">

            <form
            className="auth-form"

            onSubmit={handleRegister}>

                <h1>
                    Register
                </h1>

                <input
                type="text"

                placeholder="Enter Name"

                value={name}

                onChange={(e) =>
                setName(e.target.value)
                }
                />

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
                    Register
                </button>

            </form>

        </div>

    )

}

export default Register