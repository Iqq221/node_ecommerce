import {
    useEffect,
    useState
}
from "react"

import { Link }
from "react-router-dom"

function AdminProducts(){

    const [products, setProducts] =
    useState([])

    // GET PRODUCTS
    async function getProducts(){

        try{

            const response =
            await fetch(
                "http://localhost:3000/products"
            )

            const data =
            await response.json()

            setProducts(data)

        }
        catch(error){

            console.log(error)

        }

    }

    // OUT OF STOCK
    async function outOfStock(id){

        try{

            const token =
            localStorage.getItem("token")

            const response =
            await fetch(

                `http://localhost:3000/products/out-of-stock/${id}`,

                {

                    method: "PUT",

                    headers: {

                        Authorization:
                        token

                    }

                }

            )

            const data =
            await response.json()

            alert(data.message)

            getProducts()

        }
        catch(error){

            console.log(error)

        }

    }

    useEffect(() => {

        getProducts()

    }, [])

    return (

        <div>

            <h1 className="admin-title">
                Manage Products
            </h1>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>
                            Image
                        </th>

                        <th>
                            Name
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        products.map(product => (

                            <tr
                            key={product.id}>

                                <td>

                                    <img

                                    src={
                                    `http://localhost:3000/uploads/${product.image}`
                                    }

                                    className="admin-product-img"

                                    />

                                </td>

                                <td>
                                    {product.name}
                                </td>

                                <td>
                                    ₹{product.price}
                                </td>

                                <td>

                                    {
                                        product.stock_status
                                    }

                                </td>

                                <td>

                                    <Link
                                    to={`/admin/edit-product/${product.id}`}>

                                        <button>
                                            Edit
                                        </button>

                                    </Link>

                                    <button

                                    onClick={() =>
                                    outOfStock(product.id)
                                    }>

                                        Out Of Stock

                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    )

}

export default AdminProducts