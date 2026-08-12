import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { validateProduct } from "../utils/validation"

function EditProduct() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState("10")
    const [stockStatus, setStockStatus] = useState("in_stock")
    const [currentImage, setCurrentImage] = useState("")
    const [newImage, setNewImage] = useState(null)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    async function fetchProduct() {
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`)
            if (!response.ok) {
                setMessage({ text: "Product not found", type: "error" })
                return
            }
            const data = await response.json()
            setName(data.name || "")
            setPrice(data.price || "")
            setCategory(data.category || "")
            setDescription(data.description || "")
            setStock(data.stock || 10)
            setStockStatus(data.stock_status || "in_stock")
            setCurrentImage(data.image || "")
        } catch (error) {
            console.log(error)
            setMessage({ text: "Error fetching product details", type: "error" })
        } finally {
            setLoading(false)
        }
    }

    async function handleUpdateProduct(e) {
        e.preventDefault()
        setMessage({ text: "", type: "" })
        const error = validateProduct({ name, price, category, description, stock, image: newImage })
        if (error) {
            setMessage({ text: error, type: "error" })
            return
        }
        setSaving(true)

        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()

            formData.append("name", name.trim())
            formData.append("price", price)
            formData.append("category", category.trim())
            formData.append("description", description.trim())
            formData.append("stock", stock)
            formData.append("stock_status", stockStatus)

            if (newImage) {
                formData.append("image", newImage)
            }

            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: token
                },
                body: formData
            })

            const data = await response.json()
            if (response.ok) {
                setMessage({ text: "Product updated successfully!", type: "success" })
                setTimeout(() => {
                    navigate("/admin/products")
                }, 1200)
            } else {
                setMessage({ text: data.message || "Failed to update product", type: "error" })
            }
        } catch (error) {
            console.log(error)
            setMessage({ text: "Server error occurred while updating product", type: "error" })
        } finally {
            setSaving(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [id])

    if (loading) {
        return <div className="page-loading">Loading product data...</div>
    }

    return (
        <div className="admin-form-page">
            <div className="admin-form-header">
                <h1 className="admin-title">Edit Product #{id}</h1>
                <Link to="/admin/products" className="btn btn-secondary">
                    ← Back to Products
                </Link>
            </div>

            {message.text && (
                <div className={`alert-banner ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form className="admin-card-form" onSubmit={handleUpdateProduct}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
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
                            placeholder="Enter price"
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

                <div className="form-row">
                    <div className="form-group">
                        <label>Stock Quantity</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Enter stock count"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock Status</label>
                        <select
                            value={stockStatus}
                            onChange={(e) => setStockStatus(e.target.value)}
                        >
                            <option value="in_stock">In Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        rows="4"
                        placeholder="Product description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        minLength="10"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Product Image</label>
                    {currentImage && (
                        <div className="image-preview">
                            <span>Current Image:</span>
                            <img
                                src={`http://localhost:3000/uploads/${currentImage}`}
                                alt="Current Product"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImage(e.target.files[0])}
                    />
                    <small>Leave blank to keep existing image</small>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving Changes..." : "Update Product"}
                    </button>
                    <Link to="/admin/products" className="btn btn-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default EditProduct
