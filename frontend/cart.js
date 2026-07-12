const cartContainer =
document.getElementById("cart-container")

const totalPrice =
document.getElementById("total-price")

// GET CART ITEMS
async function getCart(){

    try{

        const token =
        localStorage.getItem("token")

        const response = await fetch(
            "http://localhost:3000/cart",
            {

                headers: {
                    "Authorization": token
                }

            }
        )

        const cartItems =
        await response.json()

        displayCart(cartItems)

    }
    catch(error){

        console.log(error)

    }

}

// DISPLAY CART
function displayCart(cartItems){

    cartContainer.innerHTML = ""

    let total = 0

    cartItems.forEach(item => {

        total += item.price * item.quantity
cartContainer.innerHTML += `

<div class="product-card">

    <img
    src="https://picsum.photos/500/500?random=${item.id}"
    />

    <div class="product-content">

        <h2>${item.name}</h2>

        <p class="price">
            ₹${item.price}
        </p>

        <div class="quantity-controls">

    <button
    class="qty-btn"
    onclick="updateQuantity(${item.id}, ${item.quantity - 1})">

        -

    </button>

    <span class="qty-number">
        ${item.quantity}
    </span>

    <button
    class="qty-btn"
    onclick="updateQuantity(${item.id}, ${item.quantity + 1})">

        +

    </button>

</div>

        <button
        onclick="removeCart(${item.id})">

            Remove Item

        </button>

    </div>

</div>

`

    })

    totalPrice.innerHTML =
    `Total: ₹${total}`

}

// REMOVE ITEM
async function removeCart(cartId){

    try{

        const token =
        localStorage.getItem("token")

        const response = await fetch(
            `http://localhost:3000/cart/${cartId}`,
            {

                method: "DELETE",

                headers: {
                    "Authorization": token
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

async function updateQuantity(cartId, quantity){

    // PREVENT 0 OR NEGATIVE
    if(quantity < 1){

        return

    }

    try{

        const token =
        localStorage.getItem("token")

        const response = await fetch(
            `http://localhost:3000/cart/${cartId}`,
            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": token

                },

                body: JSON.stringify({
                    quantity: quantity
                })

            }
        )

        const data =
        await response.json()

        console.log(data)

        // REFRESH CART
        getCart()

    }
    catch(error){

        console.log(error)

    }

}
async function placeOrder(){

    try{

        const token =
        localStorage.getItem("token")

        const response = await fetch(
            "http://localhost:3000/orders",
            {

                method: "POST",

                headers: {

                    "Authorization": token

                }

            }
        )

        const data =
        await response.json()

        alert(data.message)

        // REDIRECT TO ORDERS PAGE
        window.location.href =
        "orders.html"

    }
    catch(error){

        console.log(error)

    }

}

getCart()