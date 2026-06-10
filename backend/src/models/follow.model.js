const mongoose = require("mongoose")

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Follower required to create follow request."],
        },

        followee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Followee required to create follow request."],
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "blocked"],
            default: "pending",
        },
    },
    { timestamps: true }
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const Follow = mongoose.model("Follow", followSchema)

module.exports = Follow