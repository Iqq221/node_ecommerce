import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { validateAccount } from "../utils/validation"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    async function handleLogin(e) {
        e.preventDefault()
        setMessage({ text: "", type: "" })
        const error = validateAccount({ email, password }, { requirePassword: true })
        if (error) {
            setMessage({ text: error, type: "error" })
            return
        }
        setLoading(true)

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                setMessage({ text: data.message || "Login failed", type: "error" })
                return
            }

            localStorage.setItem("token", data.token)
            setMessage({ text: "Login successful! Redirecting...", type: "success" })
            setTimeout(() => {
                navigate("/")
            }, 1000)
        } catch (error) {
            console.log(error)
            setMessage({ text: "Server connection failed", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleLogin}>
                <h1 className="admin-title" style={{ textAlign: 'center' }}>Welcome Back</h1>
                <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>
                    Log in to manage your cart and orders
                </p>

                {message.text && (
                    <div className={`alert-banner ${message.type}`}>
                        {message.text}
                    </div>
                )}

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
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
                    {loading ? "Signing in..." : "Log In"}
                </button>

                <div className="demo-access" aria-label="Demo administrator access">
                    <div>
                        <strong>Demo administrator access</strong>
                        <span>Use these credentials to explore product and order management.</span>
                    </div>
                    <div className="demo-credentials">
                        <span><b>Email</b> admin@shopease.com</span>
                        <span><b>Password</b> admin123</span>
                    </div>
                    <button
                        type="button"
                        className="demo-fill-button"
                        onClick={() => {
                            setEmail("admin@shopease.com")
                            setPassword("admin123")
                        }}
                    >
                        Use demo login
                    </button>
                </div>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-accent)', fontWeight: 600 }}>Create one here</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
