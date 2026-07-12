const db = require("../config/db")

const adminMiddleware = (req, res, next) => {

    const userId = req.user.id

    const sql = "SELECT * FROM users WHERE id = ?"

    db.query(sql, [userId], (err, result) => {

        if(err){

            return res.status(500).json({
                message: "Database Error"
            })

        }

        if(result.length === 0){

            return res.status(404).json({
                message: "User Not Found"
            })

        }

        const user = result[0]

        // CHECK ROLE
        if(user.role !== "admin"){

            return res.status(403).json({
                message: "Access Denied. Admin Only."
            })

        }

        next()

    })

}

module.exports = adminMiddleware