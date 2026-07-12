import {
    useEffect,
    useState
}

from "react"

function Profile(){

    // USER STATE
    const [user, setUser] =
    useState(null)

    // EDIT MODE
    const [editMode, setEditMode] =
    useState(false)

    // FORM STATES
    const [name, setName] =
    useState("")

    const [email, setEmail] =
    useState("")

    // GET PROFILE
    async function getProfile(){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(
                "http://localhost:3000/users/profile",
                {

                    headers: {

                        Authorization:
                        token

                    }

                }
            )

            const data =
            await response.json()

            setUser(data)

            setName(data.name)

            setEmail(data.email)

        }
        catch(error){

            console.log(error)

        }

    }

    // UPDATE PROFILE
    async function updateProfile(){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(
                "http://localhost:3000/users/profile",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                        "application/json",

                        Authorization:
                        token

                    },

                    body: JSON.stringify({

                        name,
                        email

                    })

                }
            )

            const data =
            await response.json()

            alert(data.message)

            setEditMode(false)

            getProfile()

        }
        catch(error){

            console.log(error)

        }

    }

    useEffect(() => {

        getProfile()

    }, [])

    if(!user){

        return <h1>Loading...</h1>

    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h1>
                    My Profile
                </h1>

                {/* NAME */}

                <input
                type="text"

                value={name}

                disabled={!editMode}

                onChange={(e) =>
                setName(e.target.value)
                }
                />

                {/* EMAIL */}

                <input
                type="email"

                value={email}

                disabled={!editMode}

                onChange={(e) =>
                setEmail(e.target.value)
                }
                />

                {
                    editMode ? (

                        <button
                        onClick={updateProfile}>

                            Save Changes

                        </button>

                    ) : (

                        <button
                        onClick={() =>
                        setEditMode(true)
                        }>

                            Edit Profile

                        </button>

                    )
                }

            </div>

        </div>

    )

}

export default Profile