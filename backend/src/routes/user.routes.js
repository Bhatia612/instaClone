const express = require("express")
const userControllers = require("../controllers/user.controllers")
const authenticate = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter.get("/fetch-users", authenticate, userControllers.getUserController)
userRouter.post("/:followeeId/follow", authenticate, userControllers.followUserController)
userRouter.post("/:followeeId/unfollow", authenticate, userControllers.unFollowUserController)
userRouter.get("/follow-requests/fetch", authenticate, userControllers.fetchFollowRequestsController)
userRouter.post("/follow-req/:reqId/accept", authenticate, userControllers.acceptFollowRequest)
userRouter.post("/follow-req/:reqId/reject", authenticate, userControllers.rejectFollowRequest)



module.exports = userRouter