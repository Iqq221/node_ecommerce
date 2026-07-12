import {
    Link
}
from "react-router-dom"

function ProductCard({ product }){

    async function addToCart(){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(
                "http://localhost:3000/cart",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json",

                        Authorization:
                        token

                    },

                    body: JSON.stringify({

                        product_id:
                        product.id,

                        quantity: 1

                    })

                }
            )

            const data =
            await response.json()

            alert(data.message)

        }
        catch(error){

            console.log(error)

        }

    }

    return (

        <div className="product-card">

            <Link to={`/product/${product.id}`}>
            <img src={ product.image ? `http://localhost:3000/uploads/${product.image}`
                                    : "https://via.placeholder.com/500"}

                alt={product.name}
            />

            </Link>

            <div className="product-info">

                <Link to={`/product/${product.id}`}>

                <h2>
                    {product.name}
                </h2>

                </Link>

                <p className="price">

                    ₹{product.price}

                </p>

                <p className="description">

                    {product.description}

                </p>

                <button
                onClick={addToCart}>

                    Add To Cart

                </button>

            </div>

        </div>

    )

}

export default ProductCard