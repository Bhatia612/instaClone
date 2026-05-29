const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: [true, "Need postId ot create like for the post."],
        ref: "posts"
    },
    userId: {
        type: String,
        required: [true, "Need userId to like the post."],
        ref: "users"
    }
}, { timestamps: true })

likeSchema.index({ postId: 1, userId: 1 }, { unique: true })


const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel