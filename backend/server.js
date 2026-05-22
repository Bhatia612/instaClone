require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")


app.listen(process.env.PORT, () => {
    console.log("Server running on PORT: " + process.env.PORT)
    connectToDB()
})