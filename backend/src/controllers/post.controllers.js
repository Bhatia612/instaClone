const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PVT_KEY
})

async function createPostController(req, res) {

    try {


        const file = await imageKit.files.upload(
            {
                file: await toFile(Buffer.from(req.file.buffer), "file"),
                fileName: "userPosts",
                folder: "instaClone"
            }
        )

        const post = await postModel.create({
            caption: req.body.caption,
            imageUrl: file.url,
            user: req.user.id
        })

        res.status(201).json({
            message: "Post created . . .",
            post
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

async function getPostsController(req, res) {
    try {

        const posts = await postModel.find().populate("user", "username profilePic")

        res.status(200).json({
            message: "These are all the posts: ",
            posts
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function likePostController(req, res) {

    try {


        const user = req.user.id
        const post = req.params.postId

        const doesPostExists = await postModel.findById(post)

        if (!doesPostExists) {
            return res.status(404).json({
                message: "Post"
            })
        }

        const isLiked = await likeModel.findOne({
            post, user
        })

        if (isLiked) {
            const unliked = await likeModel.findByIdAndDelete(isLiked._id)

            return res.status(200).json({
                message: "Post unliked . . .",
                unliked
            })
        }

        const like = await likeModel.create({
            post, user
        })

        return res.status(200).json({
            message: "post liked . . .",
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createPostController,
    getPostsController,
    likePostController
}