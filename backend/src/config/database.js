const mongoose = require("mongoose")

function connectToDB() {
    return mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log("Database connected successfuly . . .")
        })
        .catch((error) => {
            console.error("Database connection failed:", error.message)
            throw error // re-throw so server.js catch block can handle it
        })
}

module.exports = connectToDB