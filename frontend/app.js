const productsContainer =
document.getElementById("products-container")

// FETCH PRODUCTS
async function getProducts(){

    try{

        const response = await fetch(
            "http://localhost:3000/products"
        )

        const products = await response.json()

        console.log(products)

        displayProducts(products)

    }
    catch(error){

        console.log(error)

    }

}

// DISPLAY PRODUCTS
function displayProducts(products){

    productsContainer.innerHTML = ""

    products.forEach(product => {

       productsContainer.innerHTML += `

<div class="product-card">

    <img
    src="https://picsum.photos/500/500?random=${product.id}"
    />

    <div class="product-content">

        <h2>${product.name}</h2>

        <p class="price">
            ₹${product.price}
        </p>

        <p class="description">
            ${product.description}
        </p>

        <button onclick="addToCart(${product.id})">
            Add To Cart
        </button>

    </div>

</div>

`

    })

}
async function addToCart(productId){

    try{

        // GET TOKEN
        const token =
        localStorage.getItem("token")

        // API REQUEST
        const response = await fetch(
            "http://localhost:3000/cart",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": token

                },

                body: JSON.stringify({

                    product_id: productId,
                    quantity: 1

                })

            }
        )

        const data = await response.json()

        alert(data.message)

    }
    catch(error){

        console.log(error)

    }

}
getProducts()