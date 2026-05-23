const userModel = require("../models/user.model")
const followModel = require("../models/follow.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function getUserController(req, res) {
    const users = await userModel.find()
    res.status(200).json({
        message: "These are all the users.",
        users
    })
}

async function followUserController(req, res) {
    const followeeId = req.params.followeeId
    const followerId = req.decodedUser.id


    // checking if the follower is registered.

    const doesUserExists = await userModel.findOne({
        _id: followeeId
    })

    if (!doesUserExists) {
        return res.status(401).json({
            message: "User you want to follow doesnot exists . . ."
        })
    }

    if (followerId === followeeId) {
        return res.status(400).json({
            message: "You cannot follow yourself . . ."
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerId,
        followee: followeeId
    }).populate("follower")
        .populate("followee")

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${isAlreadyFollowing.followee.username} . . .`,
            isAlreadyFollowing
        })
    }

    const follow = await followModel.create({
        followee: followeeId,
        follower: followerId
    }).populate("followee", "username")

    res.status(200).json({
        message: `Follow request sent to ${follow.followee.username}`,
        follow
    })
}

async function fetchFollowRequestsController(req, res) {
    const userId = req.decodedUser.id

    const allFollowrequests = await followModel.find({
        $or: [
            { follower: userId },
            { followee: userId }
        ]
    }).populate("follower", "username _id").populate("followee", "username _id")

    const recievedRequests = allFollowrequests.filter((req) => req.followee._id == userId)
    const sentRequests = allFollowrequests.filter((req) => req.follower._id == userId)


    res.status(200).json({
        message: "Here are you requests: ",
        recievedRequests,
        sentRequests
    })
}

async function acceptFollowRequest(req, res) {
    const userId = req.decodedUser.id
    const reqId = req.params.reqId

    const followReq = await followModel.findById(reqId).populate("follower").populate("followee", "_id")

    if (!followReq) {
        return res.status(404).json({
            message: "The request does not exist."
        })
    }

    if (followReq.followee._id.toString() !== userId) {

        return res.status(403).json({
            message: "You are not authorised to handle this follow request . . ."
        })
    }

    const acceptedReq = await followModel.findOneAndUpdate(
        {
            _id: reqId,
            status: "pending",
        },
        {
            status: "accepted",
        },
        {
            new: true,
        }
    ).populate("follower", "username")

    if (!acceptedReq) {
        return res.status(409).json({
            message: "The request was already handled."
        })
    }

    res.status(200).json({
        message: `Request accepted from ${acceptedReq.follower.username}`,
        acceptedReq
    })



}

async function rejectFollowRequest(req, res) {
    const userId = req.decodedUser.id
    const reqId = req.params.reqId

    const followReq = await followModel.findById(reqId).populate("follower").populate("followee", "_id")

    if (!followReq) {
        return res.status(404).json({
            message: "The request does not exist."
        })
    }

    if (followReq.followee._id.toString() !== userId) {

        return res.status(403).json({
            message: "You are not authorised to handle this follow request . . ."
        })
    }

    const rejectedReq = await followModel.findOneAndUpdate(
        {
            _id: reqId,
            status: "pending",
        },
        {
            status: "rejected",
        },
        {
            new: true,
        }
    ).populate("follower", "username")

    if (!rejectedReq) {
        return res.status(409).json({
            message: "The request was already handled."
        })
    }

    res.status(200).json({
        message: `Request accepted from ${rejectedReq.follower.username}`,
        rejectedReq
    })



}




module.exports = {
    getUserController,
    followUserController,
    fetchFollowRequestsController,
    acceptFollowRequest,
    rejectFollowRequest
}