const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log("Database connected successfuly . . .")
        })
}

module.exports = connectToDB