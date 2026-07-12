//Middleware is simply: a function that runs BEFORE the route controller.

const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

    try{

        // GET TOKEN FROM HEADER
        const token = req.header("Authorization")

        // CHECK TOKEN
        if(!token){

            return res.status(401).json({
                message: "No Token, Access Denied"
            })

        }

        // VERIFY TOKEN
        const verified = jwt.verify(token, "secretkey")

        // SAVE USER DATA
        req.user = verified

        next()

    }
    catch(error){

        res.status(401).json({
            message: "Invalid Token"
        })

    }

}

module.exports = authMiddleware
