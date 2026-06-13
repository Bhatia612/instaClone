const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username required to create user."],
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email required to create user."],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },

        password: {
            type: String,
            required: [true, "Password required to create user."],
            minlength: [6, "Password must be at least 6 characters"],
            select: false
        },

        bio: {
            type: String,
            default: "",
        },

        profilePic: {
            type: String,
            default: "https://ik.imagekit.io/mohit49251/dummy_pfp.webp?updatedAt=1778116617304",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User