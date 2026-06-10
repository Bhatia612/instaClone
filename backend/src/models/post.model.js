const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "userId required to create post."],
        },

        caption: {
            type: String,
            default: "",
            trim: true
        },

        imageUrl: {
            type: String,
            required: [true, "ImageURl required to create post."],
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;