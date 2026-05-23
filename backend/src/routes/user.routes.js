const express = require("express")
const userController = require("../controllers/user.controllers")
const identifyuser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter.get("/fetch-users", userController.getUserController)
userRouter.post("/:followeeId/follow", identifyuser, userController.followUserController)
userRouter.get("/follow-requests/fetch", identifyuser, userController.fetchFollowRequestsController)
userRouter.post("/follow-req/:reqId/accept", identifyuser, userController.acceptFollowRequest)
userRouter.post("/follow-req/:reqId/reject", identifyuser, userController.rejectFollowRequest)



module.exports = userRouter