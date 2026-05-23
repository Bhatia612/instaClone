const express = require("express")
const userControllers = require("../controllers/user.controllers")
const identifyuser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter.get("/fetch-users", userControllers.getUserController)
userRouter.post("/:followeeId/follow", identifyuser, userControllers.followUserController)
userRouter.post("/:followeeId/unfollow", identifyuser, userControllers.unFollowUserController)
userRouter.get("/follow-requests/fetch", identifyuser, userControllers.fetchFollowRequestsController)
userRouter.post("/follow-req/:reqId/accept", identifyuser, userControllers.acceptFollowRequest)
userRouter.post("/follow-req/:reqId/reject", identifyuser, userControllers.rejectFollowRequest)



module.exports = userRouter