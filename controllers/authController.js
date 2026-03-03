const userModel = require('../models/userModel');
const errorResponse = require('../utils/errorResponse');

// 🔐 JWT Token sender
const sendToken = (user, statusCode, res) => {
    const { accessToken, refreshToken } = user.getSignedToken();

    // Set refresh token in HTTP-only cookie (secure in production)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // use HTTPS in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(statusCode).json({
        success: true,
        token: accessToken,
        user: {
            _id: user._id,
            name: user.username,
            email: user.email,
            // Add any other safe fields here (not password)
        },
    });
};

// 🧑‍💻 Register controller
const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please provide all required fields: username, email, password" });
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return next(new errorResponse("Email already exists", 400));
        }

        const user = await userModel.create({ username, email, password });
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

// 🔐 Login controller
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new errorResponse("Please provide email and password", 400));
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new errorResponse("Invalid email or password", 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// 🚪 Logout controller
const logoutController = async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};

module.exports = {
    registerController,
    loginController,
    logoutController,
};
