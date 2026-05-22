const express = require("express")
const userController = require("../controllers/user.controllers")
const identifyuser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter.get("/fetch-users", userController.getUserController)
userRouter.post("/:followeeId/follow", identifyuser, userController.followUserController)
userRouter.get("/follow-requests/fetch", identifyuser, userController.fetchFollowRequestsController)



module.exports = userRouter