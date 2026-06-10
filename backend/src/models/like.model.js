const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
        type: String,
        required: [true, "Need postId ot create like for the post."],
        ref: "posts"
    },
    user: {
        type: String,
        required: [true, "Need userId to like the post."],
        ref: "users"
    }
}, { timestamps: true })

likeSchema.index({ post: 1, user: 1 }, { unique: true })


const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel