const ordersContainer =
document.getElementById("orders-container")

// GET ORDERS
async function getOrders(){

    try{

        const token =
        localStorage.getItem("token")

        const response = await fetch(
            "http://localhost:3000/orders",
            {

                headers: {
                    "Authorization": token
                }

            }
        )

        const orders =
        await response.json()

        displayOrders(orders)

    }
    catch(error){

        console.log(error)

    }

}

// DISPLAY ORDERS
function displayOrders(orders){

    ordersContainer.innerHTML = ""

    orders.forEach(order => {

        ordersContainer.innerHTML += `

        <div class="product-card">

            <div class="product-content">

                <h2>
                    Order #${order.id}
                </h2>

                <p class="price">
                    ₹${order.total_amount}
                </p>

                <p class="description">

                    Ordered On:
                    ${new Date(
                        order.created_at
                    ).toLocaleDateString()}

                </p>

            </div>

        </div>

        `

    })

}

getOrders()