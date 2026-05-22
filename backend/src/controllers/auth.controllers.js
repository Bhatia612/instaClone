const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    const { username, email, password, bio, profilePic } = req.body

    // Checking all fields are provided.

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    // Checking if user already has account with provided username or email.

    const doesUserExists = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (doesUserExists) {
        return res.status(409).json({
            message: "The user alerady exists . . .",
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username, email, password: hashedPassword, bio, profilePic
    })

    // creating a token and storeing in cookies.

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        { expiresIn: '1d' })


    res.cookie("token", token)

    res.status(200).json({
        message: "New User Registered . . .",
        username: user.username
    })
}

async function loginController(req, res) {
    const { usernameOrEmail, password } = req.body

    // Checking all fields are provided.

    if (!usernameOrEmail || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    // Checking if user has account with provided username or email.

    const user = await userModel.findOne({
        $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
        ]
    }).select("+password")

    console.log(user.password)

    //If user not registered.

    if (!user) {
        return res.status(400).json({
            message: "The use does not exists.",
        })
    }

    // checking if password is correct.
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Password incorrect",
        })
    }

    // creating a token and storeing in cookies.

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        { expiresIn: '1d' })


    res.cookie("token", token)


    res.status(200).json({
        message: "user logged in",
        username: user.username
    })

}

module.exports = {
    registerController,
    loginController
}