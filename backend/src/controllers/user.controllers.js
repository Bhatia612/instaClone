const User = require("../models/user.model")
const Follow = require("../models/follow.model")

async function getUserController(req, res) {
    try {
        const users = await User.find()
        res.status(200).json({
            message: "These are all the users",
            users
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function followUserController(req, res) {
    try {
        const followeeId = req.params.followeeId
        const followerId = req.user.id

        if (followerId === followeeId) {
            return res.status(400).json({ message: "You cannot follow yourself" })
        }

        const doesUserExist = await User.findById(followeeId)

        if (!doesUserExist) {
            return res.status(404).json({ message: "User you want to follow does not exist" })
        }

        const isAlreadyFollowing = await Follow.findOne({
            follower: followerId,
            followee: followeeId
        })

        if (isAlreadyFollowing) {
            return res.status(409).json({ message: "You are already following this user" })
        }

        const followed = await Follow.create({
            followee: followeeId,
            follower: followerId
        })

        res.status(201).json({
            message: "Follow request sent",
            followed
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function unFollowUserController(req, res) {
    try {
        const userId = req.user.id
        const followeeId = req.params.followeeId

        const unfollowed = await Follow.findOneAndDelete({
            follower: userId,
            followee: followeeId,
        })

        if (!unfollowed) {
            return res.status(404).json({ message: "You are not following this user" })
        }

        res.status(200).json({ message: "Unfollowed successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function fetchFollowRequestsController(req, res) {
    try {
        const userId = req.user.id

        const allFollowRequests = await Follow.find({
            status: "pending",
            $or: [
                { follower: userId },
                { followee: userId }
            ]
        }).populate("follower", "username _id").populate("followee", "username _id")

        const receivedRequests = allFollowRequests.filter((req) => req.followee._id == userId)
        const sentRequests = allFollowRequests.filter((req) => req.follower._id == userId)

        res.status(200).json({
            message: "Here are your requests",
            receivedRequests,
            sentRequests
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function acceptFollowRequest(req, res) {
    try {
        const userId = req.user.id
        const reqId = req.params.reqId

        const followReq = await Follow.findById(reqId).populate("followee", "_id").populate("follower", "username")

        if (!followReq) {
            return res.status(404).json({ message: "Request does not exist" })
        }

        if (followReq.followee._id.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to handle this request" })
        }

        const acceptedReq = await Follow.findOneAndUpdate(
            { _id: reqId, status: "pending" },
            { status: "accepted" },
            { new: true }
        ).populate("follower", "username")

        if (!acceptedReq) {
            return res.status(409).json({ message: "Request was already handled" })
        }

        res.status(200).json({
            message: `Request accepted from ${acceptedReq.follower.username}`,
            acceptedReq
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function rejectFollowRequest(req, res) {
    try {
        const userId = req.user.id
        const reqId = req.params.reqId

        const followReq = await Follow.findById(reqId).populate("followee", "_id").populate("follower", "username")

        if (!followReq) {
            return res.status(404).json({ message: "Request does not exist" })
        }

        if (followReq.followee._id.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to handle this request" })
        }

        const rejectedReq = await Follow.findOneAndUpdate(
            { _id: reqId, status: "pending" },
            { status: "rejected" },
            { new: true }
        ).populate("follower", "username")

        if (!rejectedReq) {
            return res.status(409).json({ message: "Request was already handled" })
        }

        res.status(200).json({
            message: `Request rejected from ${rejectedReq.follower.username}`,
            rejectedReq
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getUserController,
    followUserController,
    unFollowUserController,
    fetchFollowRequestsController,
    acceptFollowRequest,
    rejectFollowRequest
}