import { useState }
from "react"

function AddProduct(){

    const [name, setName] =
    useState("")

    const [price, setPrice] =
    useState("")

    const [description, setDescription] =
    useState("")

    const [image, setImage] =
    useState(null)

    const [category, setCategory] =
    useState("")

    async function handleSubmit(e){

        e.preventDefault()

        try{

            const token =
            localStorage.getItem("token")

            const formData =
            new FormData()

            formData.append(
                "name",
                name
            )

            formData.append(
                "price",
                price
            )

            formData.append(
                "category",
                category
            )

            formData.append(
                "description",
                description
            )

            formData.append(
                "image",
                image
            )

            const response =
            await fetch(
                "http://localhost:3000/products",
                {

                    method: "POST",

                    headers: {

                        Authorization:
                        token

                    },

                    body: formData

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

        <div className="admin-form-container">

            <form
            className="admin-form"

            onSubmit={handleSubmit}>

                <h1>
                    Add Product
                </h1>

                <input
                type="text"

                placeholder="Name"

                value={name}

                onChange={(e) =>
                setName(e.target.value)
                }
                />

                <input
                type="number"

                placeholder="Price"

                value={price}

                onChange={(e) =>
                setPrice(e.target.value)
                }
                />
                <input
                    type="text"

                    placeholder="Category"

                    value={category}

                    onChange={(e) =>
                        setCategory(e.target.value)
                        }
                />

                <textarea

                placeholder="Description"

                value={description}

                onChange={(e) =>
                setDescription(e.target.value)
                }
                />

                <input
                type="file"

                onChange={(e) =>
                setImage(e.target.files[0])
                }
                />

                <button>
                    Add Product
                </button>

            </form>

        </div>

    )

}

export default AddProduct