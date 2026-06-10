const jwt = require("jsonwebtoken")

async function authenticate(req, res, next) {
    const token = req.cookies.token


    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorised request . . ."
        })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.decodedUser = decoded
        next()
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired, please login again" })
        }
        return res.status(401).json({ message: "Invalid token, unauthorized request" })
    }
}



module.exports = authenticate;