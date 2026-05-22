const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username required to create user."],
            unique: [true, "Username should be unique."],
        },

        email: {
            type: String,
            required: [true, "Email required to create user."],
            unique: [true, "Email should be unique."],
            lowercase: true,
        },

        password: {
            type: String,
            required: [true, "Password required to create user."],
            minlength: 6,
            select: false
        },

        bio: {
            type: String,
            default: "",
        },

        profilePic: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel