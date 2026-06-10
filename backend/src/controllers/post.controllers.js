const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PVT_KEY
})

async function createPostController(req, res) {

    console.log(req.file)

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
        user: req.decodedUser.id
    })

    res.status(200).json({
        message: "Post created . . .",
        post
    })

}

async function getPostsController(req, res) {
    const posts = await postModel.find().populate("user", "username profilePic")

    res.status(200).json({
        message: "These are all the posts: ",
        posts
    })
}

async function likePostController(req, res) {
    const user = req.decodedUser.id
    const post = req.params.postId

    const doesPostExists = postModel.findById(post)

    if (!doesPostExists) {
        return res.status(401).json({
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
}


module.exports = {
    createPostController,
    getPostsController,
    likePostController
}