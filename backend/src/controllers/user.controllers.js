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
    })

    res.status(200).json({
        message: `${follow.follower.username} started following ${follow.followee.username}`,
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
    }).populate("follower").populate("followee")

    const recievedRequests = allFollowrequests.filter((req) => req.followee._id == userId)
    const sentRequests = allFollowrequests.filter((req) => req.follower._id == userId)


    res.status(200).json({
        message: "Here are you requests: ",
        recievedRequests,
        sentRequests
    })
}




module.exports = {
    getUserController,
    followUserController,
    fetchFollowRequestsController
}