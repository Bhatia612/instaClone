const postModel = require("../models/post.model")
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
        userId: req.decodedUser.id
    })

    res.status(200).json({
        message: "Post created . . .",
        post
    })

}

async function getPostsController(req, res) {
    const posts = await postModel.find().populate("userId", "username profilePic")

    res.status(200).json({
        message: "These are all the posts: ",
        posts
    })
}



module.exports = {
    createPostController,
    getPostsController
}