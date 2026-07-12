import { useEffect, useState }

from "react"

function Cart(){

    // STATE
    const [cartItems, setCartItems] =
    useState([])

    // FETCH CART
    async function getCart(){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(
                "http://localhost:3000/cart",
                {

                    headers: {
                        Authorization: token
                    }

                }
            )

            const data =
            await response.json()

            setCartItems(data)

        }
        catch(error){

            console.log(error)

        }

    }

    // REMOVE ITEM
    async function removeItem(cartId){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(
                `http://localhost:3000/cart/${cartId}`,
                {

                    method: "DELETE",

                    headers: {
                        Authorization: token
                    }

                }
            )

            const data =
            await response.json()

            alert(data.message)

            getCart()

        }
        catch(error){

            console.log(error)

        }

    }

    // UPDATE QUANTITY
    async function updateQuantity(
        cartId,
        quantity
    ){

        if(quantity < 1){

            return

        }

        try{

            const token =
            localStorage.getItem("token")

            await fetch(
                `http://localhost:3000/cart/${cartId}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                        "application/json",

                        Authorization:
                        token

                    },

                    body: JSON.stringify({
                        quantity
                    })

                }
            )

            getCart()

        }
        catch(error){

            console.log(error)

        }

    }

    // TOTAL PRICE
    const total =
    cartItems.reduce((sum, item) => {

        return sum +
        item.price * item.quantity

    }, 0)

    // PAGE LOAD
    useEffect(() => {

        getCart()

    }, [])

    return (

        <div className="cart-page">

            <h1 className="products-title">
                My Cart
            </h1>

            <div className="cart-container">

                {
                    cartItems.map(item => (

                        <div
                        className="cart-card"
                        key={item.id}>

                            <img
                            src={
                                item.image
                                ? `http://localhost:3000/uploads/${item.image}`
                                : "https://via.placeholder.com/500"
                            }
                            />

                            <div className="cart-content">

                                <h2>
                                    {item.name}
                                </h2>

                                <p className="price">
                                    ₹{item.price}
                                </p>

                                {/* QUANTITY */}

                                <div
                                className="quantity-controls">

                                    <button
                                    className="qty-btn"

                                    onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity - 1
                                    )
                                    }>

                                        -

                                    </button>

                                    <span>

                                        {item.quantity}

                                    </span>

                                    <button
                                    className="qty-btn"

                                    onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity + 1
                                    )
                                    }>

                                        +

                                    </button>

                                </div>

                                <button
                                onClick={() =>
                                removeItem(item.id)
                                }>

                                    Remove Item

                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>

            {/* TOTAL */}

            <div className="total-section">

                <h2>
                    Total: ₹{total}
                </h2>

            </div>

        </div>

    )

}

export default Cart