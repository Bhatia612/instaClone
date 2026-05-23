const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "userId required to create post."],
        },

        caption: {
            type: String,
            default: "",
        },

        imageUrl: {
            type: String,
            required: [true, "ImageURl required to create post."],
        }
    },
    { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;