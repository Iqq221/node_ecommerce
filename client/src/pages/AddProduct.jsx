import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { validateProduct } from "../utils/validation"

function AddProduct() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("10")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    async function handleSubmit(e) {
        e.preventDefault()
        const error = validateProduct({ name, price, category, description, stock, image }, { imageRequired: true })
        if (error) {
            setMessage({ text: error, type: "error" })
            return
        }

        setLoading(true)
        setMessage({ text: "", type: "" })

        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("name", name.trim())
            formData.append("price", price)
            formData.append("category", category.trim())
            formData.append("description", description.trim())
            formData.append("stock", stock)
            formData.append("image", image)

            const response = await fetch("http://localhost:3000/products", {
                method: "POST",
                headers: {
                    Authorization: token
                },
                body: formData
            })

            const data = await response.json()
            if (response.ok) {
                setMessage({ text: "Product added successfully!", type: "success" })
                setTimeout(() => {
                    navigate("/admin/products")
                }, 1200)
            } else {
                setMessage({ text: data.message || "Failed to add product", type: "error" })
            }
        } catch (error) {
            console.log(error)
            setMessage({ text: "Server error occurred", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-form-page">
            <div className="admin-form-header">
                <h1 className="admin-title">Add New Product</h1>
                <Link to="/admin/products" className="btn btn-secondary">
                    ← Back to Products
                </Link>
            </div>

            {message.text && (
                <div className={`alert-banner ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form className="admin-card-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Wireless Headphones"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength="3"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="2999"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            minLength="2"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            placeholder="e.g. Electronics, Clothing"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                            type="number"
                            min="0"
                            step="1"
                        placeholder="10"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        rows="4"
                        placeholder="Detailed product features and specifications..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        minLength="10"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Product Image File</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Adding Product..." : "Create Product Listing"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
