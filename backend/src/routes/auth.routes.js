const express = require("express")
const authenticate = require("../middlewares/auth.middleware")
const authControllers = require("../controllers/auth.controllers")

const authRouter = express.Router()



authRouter.post("/register", authControllers.registerController)

authRouter.post("/login", authControllers.loginController)

authRouter.post("/logout", authenticate, authControllers.logoutController)

authRouter.get("/me", authenticate, authControllers.getMeController)

module.exports = authRouter