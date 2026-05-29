const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const postRouter = require("./routes/post.routes")
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))



app.use("/api/auth", authRouter);


app.use("/api/user", userRouter);

app.use("/api/posts", postRouter)


module.exports = app