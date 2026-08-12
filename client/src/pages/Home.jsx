import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"

function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    async function getProducts() {
        try {
            const response = await fetch("http://localhost:3000/products")
            const data = await response.json()
            if (Array.isArray(data)) {
                setProducts(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    // Extract unique categories dynamically from products
    const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))]

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name?.toLowerCase().includes(search.toLowerCase()) ||
            product.description?.toLowerCase().includes(search.toLowerCase())

        const matchesCategory =
            selectedCategory === "All" ||
            product.category?.toLowerCase() === selectedCategory.toLowerCase()

        return matchesSearch && matchesCategory
    })

    return (
        <div className="home-container">
            {/* HERO BANNER */}
            <div className="hero-banner">
                <div className="hero-content">
                    <span className="hero-badge">Summer Collection 2026</span>
                    <h1 className="hero-title">Discover Quality Products at Unbeatable Prices</h1>
                    <p className="hero-subtitle">
                        Shop electronics, fashion apparel, accessories, and everyday essentials with fast delivery.
                    </p>
                </div>
            </div>

            {/* CONTROLS BAR */}
            <div className="catalog-header">
                <h2 className="section-title">Explore Catalog</h2>

                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by product name or keyword..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                    {search && (
                        <button className="search-clear" onClick={() => setSearch("")}>
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* CATEGORY FILTERS */}
            <div className="filter-chips">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* PRODUCTS GRID */}
            {loading ? (
                <div className="page-loading">Loading products catalog...</div>
            ) : filteredProducts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>No Products Found</h3>
                    <p>Try adjusting your search criteria or category filter.</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home