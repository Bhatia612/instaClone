const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Need postId ot create like for the post."],
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Need userId to like the post."],
        ref: "User"
    }
}, { timestamps: true })

likeSchema.index({ post: 1, user: 1 }, { unique: true })


const Like = mongoose.model("Like", likeSchema)

module.exports = Like