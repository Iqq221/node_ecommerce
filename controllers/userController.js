const db = require("../config/db")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

// REGISTER USER
const registerUser = async (req, res) => {

    try{

        const { name, email, password } = req.body

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10)

        const sql = `
        INSERT INTO users(name, email, password)
        VALUES (?, ?, ?)
        `

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {

                if(err){
                    res.status(500).json({
                        message: "Database Error"
                    })
                }
                else{
                    res.json({
                        message: "User Registered Successfully"
                    })
                }
            }
        )

    }
    catch(error){

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// LOGIN USER
const loginUser = (req, res) => {

    try{

        const { email, password } = req.body

        const sql = "SELECT * FROM users WHERE email = ?"

        db.query(sql, [email], async (err, result) => {

            if(err){

                res.status(500).json({
                    message: "Database Error"
                })

            }
            else{

                // USER NOT FOUND
                if(result.length === 0){

                    res.status(404).json({
                        message: "User Not Found"
                    })

                }
                else{

                    const user = result[0]

                    // COMPARE PASSWORD
                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if(!isMatch){

                        res.status(401).json({
                            message: "Invalid Password"
                        })

                    }
                    else{

                        // GENERATE TOKEN
                        const token = jwt.sign(
                            {
                                id: user.id,
                                email: user.email,
                                role: user.role
                            },
                            "secretkey",
                            {
                                expiresIn: "7d"
                            }
                        )

                        res.json({
                            message: "Login Successful",
                            token: token
                        })

                    }

                }

            }

        })

    }
    catch(error){

        res.status(500).json({
            message: "Server Error"
        })

    }

}
// GET PROFILE
const getProfile = (req, res) => {

    try{

        // USER ID FROM TOKEN
        const userId = req.user.id

        const sql =
        "SELECT id, name, email FROM users WHERE id = ?"

        db.query(sql, [userId],
        (err, result) => {

            if(err){

                return res.status(500).json({
                    message: "Database Error"
                })

            }

            res.json(result[0])

        })

    }
    catch(error){

        res.status(500).json({
            message: "Server Error"
        })

    }

}

// UPDATE PROFILE
const updateProfile = (req, res) => {

    try{

        const userId = req.user.id

        const { name, email } = req.body

        const sql =
        `
        UPDATE users
        SET name = ?, email = ?
        WHERE id = ?
        `

        db.query(
            sql,
            [name, email, userId],

            (err, result) => {

                if(err){

                    return res.status(500).json({
                        message: "Database Error"
                    })

                }

                res.json({
                    message:
                    "Profile Updated"
                })

            }

        )

    }
    catch(error){

        res.status(500).json({
            message: "Server Error"
        })

    }

}
module.exports = {

    registerUser,
    loginUser,
    getProfile,
    updateProfile

}