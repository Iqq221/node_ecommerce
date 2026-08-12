import { useEffect, useState } from "react"
import { validateAccount } from "../utils/validation"

function Profile() {
    const [user, setUser] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState({ text: "", type: "" })

    async function getProfile() {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3000/users/profile", {
                headers: {
                    Authorization: token
                }
            })

            const data = await response.json()
            setUser(data)
            setName(data.name || "")
            setEmail(data.email || "")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile() {
        const error = validateAccount({ name, email }, { requirePassword: false })
        if (error) {
            setMessage({ text: error, type: "error" })
            return
        }
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3000/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase() })
            })

            const data = await response.json()
            if (response.ok) {
                setMessage({ text: "Profile updated successfully!", type: "success" })
                setEditMode(false)
                getProfile()
            } else {
                setMessage({ text: data.message || "Failed to update profile", type: "error" })
            }
        } catch (error) {
            console.log(error)
            setMessage({ text: "Error updating profile", type: "error" })
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    if (loading) {
        return <div className="page-loading">Loading user profile...</div>
    }

    return (
        <div className="auth-page">
            <div className="auth-form">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>👤</div>
                    <h1 className="admin-title">Account Profile</h1>
                </div>

                {message.text && (
                    <div className={`alert-banner ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        disabled={!editMode}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength="2"
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        disabled={!editMode}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    {editMode ? (
                        <div className="action-buttons-flex">
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={updateProfile}>
                                Save Changes
                            </button>
                            <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setEditMode(true)}>
                            Edit Profile Details
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
