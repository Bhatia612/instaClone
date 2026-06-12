const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    try {
        const { username, email, password, bio, profilePic } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const doesUserExist = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (doesUserExist) {
            return res.status(409).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username, email, password: hashedPassword, bio, profilePic
        })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, { httpOnly: true })

        res.status(201).json({
            message: "User registered successfully",
            username: user.username
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function loginController(req, res) {
    try {
        const { usernameOrEmail, password } = req.body

        if (!usernameOrEmail || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        }).select("+password")

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, { httpOnly: true })

        res.status(200).json({
            message: "Logged in successfully",
            username: user.username
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function logoutController(req, res) {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getMeController(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    getMeController
}