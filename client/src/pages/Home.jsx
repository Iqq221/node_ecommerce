import { useEffect, useState }
from "react"

import ProductCard
from "../components/ProductCard"

function Home(){

    // STATE
    const [products, setProducts] =
    useState([])

    const [search, setSearch] =
    useState("")

    const [category, setCategory] =
    useState("All")

    // FETCH PRODUCTS
    async function getProducts(){

        try{

            const response =
            await fetch(
                "http://localhost:3000/products"
            )

            const data =
            await response.json()

            console.log(data)

            setProducts(data)

        }
        catch(error){

            console.log(error)

        }

    }

    // RUN WHEN PAGE LOADS
    useEffect(() => {

        getProducts()

    }, [])
const filteredProducts =
products.filter(product => {

    const matchesSearch =
    product.name
    .toLowerCase()
    .includes(
        search.toLowerCase()
    )

    const matchesCategory =

    category === "All"

    ||

    product.category === category

    return (
        matchesSearch &&
        matchesCategory
    )

})
    return (

        <div className="products-section">

            <h1 className="products-title">
                Trending Products
            </h1>

            <div className="search-container">
            <input type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                    }
                className="search-input"
            />
            </div>

            
            <div className="filter-buttons">

            <button
                onClick={() =>
                    setCategory("All")
                }>

                All

            </button>
            
            <button
                onClick={() =>
                    setCategory("Clothing")
                }>

                Clothing

            </button>

            <button
                onClick={() =>
                    setCategory("Accessories")
                }>

                Accessories

            </button>

            <button
                onClick={() =>
                    setCategory("Bags")
                }>

                    Bags

            </button>

            <button
                onClick={() =>
                    setCategory("Footwear")
                }>

                    Footwear

            </button>

            </div>

            <div id="products-container">

                {
                    filteredProducts.map(product => (

                        <ProductCard
                        key={product.id}
                        product={product}
                        />

                    ))
                }

            </div>

        </div>

    )

}

export default Home