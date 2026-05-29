const express = require("express")
const postControllers = require("../controllers/post.controllers")
const identifyuser = require("../middlewares/auth.middleware")

const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()


postRouter.get("/get-posts", postControllers.getPostsController)
postRouter.post("/create-new-post", upload.single("image"), identifyuser, postControllers.createPostController)
postRouter.post("/like/:postId", identifyuser, postControllers.likePostController)

module.exports = postRouter