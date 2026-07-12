import {
    useEffect,
    useState
}
from "react"

import {
    useParams
}
from "react-router-dom"

function ProductDetails(){

    const { id } =
    useParams()

    const [product, setProduct] =
    useState(null)

    // GET PRODUCT
    async function getProduct(){

        try{

            const response =
            await fetch(

                `http://localhost:3000/products/${id}`

            )

            const data =
            await response.json()

            setProduct(data)

        }
        catch(error){

            console.log(error)

        }

    }

    // ADD TO CART
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

    useEffect(() => {

        getProduct()

    }, [])

    if(!product){

        return <h1>Loading...</h1>

    }

    return (

        <div className="details-page">

            {/* IMAGE */}

            <div className="details-image">

                <img

                src={
                `http://localhost:3000/uploads/${product.image}`
                }

                />

            </div>

            {/* CONTENT */}

            <div className="details-content">

                <h1>

                    {product.name}

                </h1>

                <h2>

                    ₹{product.price}

                </h2>

                <p>

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

export default ProductDetails