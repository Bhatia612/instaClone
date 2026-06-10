const express = require("express")
const postControllers = require("../controllers/post.controllers")
const multer = require("multer")
const authenticate = require("../middlewares/auth.middleware")
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()


postRouter.get("/get-posts", authenticate, postControllers.getPostsController)
postRouter.post("/create-new-post", authenticate, upload.single("image"), postControllers.createPostController)
postRouter.post("/like/:postId", authenticate, postControllers.likePostController)

module.exports = postRouter