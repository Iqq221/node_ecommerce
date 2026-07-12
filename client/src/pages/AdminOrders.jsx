import {
    useEffect,
    useState
}
from "react"

function AdminOrders(){

    const [orders, setOrders] =
    useState([])

    // GET ORDERS
    async function getOrders(){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(

                "http://localhost:3000/orders/admin",

                {

                    headers: {

                        Authorization:
                        token

                    }

                }

            )

            const data =
            await response.json()

            setOrders(data)

        }
        catch(error){

            console.log(error)

        }

    }

    // UPDATE STATUS
    async function updateStatus(
        id,
        status
    ){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(

                `http://localhost:3000/orders/status/${id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                        "application/json",

                        Authorization:
                        token

                    },

                    body: JSON.stringify({

                        status

                    })

                }

            )

            const data =
            await response.json()

            alert(data.message)

            getOrders()

        }
        catch(error){

            console.log(error)

        }

    }

    useEffect(() => {

        getOrders()

    }, [])

    return (

        <div>

            <h1 className="admin-title">

                Manage Orders

            </h1>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>
                            Order ID
                        </th>

                        <th>
                            Customer
                        </th>

                        <th>
                            Email
                        </th>

                        <th>
                            Total
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Change Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        orders.map(order => (

                            <tr
                            key={order.id}>

                                <td>
                                    #{order.id}
                                </td>

                                <td>
                                    {order.name}
                                </td>

                                <td>
                                    {order.email}
                                </td>

                                <td>
                                    ₹{order.total}
                                </td>

                                <td>

                                    <span
                                    className={`status-badge ${order.status}`}>

                                        {order.status}

                                    </span>

                                </td>

                                <td>

                                    <select

                                    value={order.status}

                                    onChange={(e) =>
                                    updateStatus(
                                        order.id,
                                        e.target.value
                                    )
                                    }>

                                        <option>
                                            Processing
                                        </option>

                                        <option>
                                            Packed
                                        </option>

                                        <option>
                                            Shipped
                                        </option>

                                        <option>
                                            Out For Delivery
                                        </option>

                                        <option>
                                            Delivered
                                        </option>

                                    </select>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    )

}

export default AdminOrders