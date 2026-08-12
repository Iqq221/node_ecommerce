import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { validateAccount } from "../utils/validation"

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    async function handleRegister(e) {
        e.preventDefault()
        setMessage({ text: "", type: "" })
        const error = validateAccount({ name, email, password })
        if (error) {
            setMessage({ text: error, type: "error" })
            return
        }
        setLoading(true)

        try {
            const response = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password })
            })

            const data = await response.json()

            if (response.ok) {
                setMessage({ text: "Account created successfully! Please log in.", type: "success" })
                setTimeout(() => {
                    navigate("/login")
                }, 1500)
            } else {
                setMessage({ text: data.message || "Registration failed", type: "error" })
            }
        } catch (error) {
            console.log(error)
            setMessage({ text: "Server error during registration", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleRegister}>
                <h1 className="admin-title" style={{ textAlign: 'center' }}>Create Account</h1>
                <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>
                    Join ShopEase to start shopping today
                </p>

                {message.text && (
                    <div className={`alert-banner ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength="2"
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="yourname@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trimStart())}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Choose a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
                    {loading ? "Creating Account..." : "Register Now"}
                </button>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-accent)', fontWeight: 600 }}>Log in here</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
