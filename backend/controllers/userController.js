import asyncHandler from 'express-async-handler'; // allows us to handle errors in our async express routes
import User from '../models/userModel.js'; // import the user model
import generateToken from '../utils/generateToken.js'; // import the function to generate a token


// @desc: Auth user & get token
// @route: POST /api/users/login
// @access: Public
const authUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}); // find the user by email

    if (user && (await user.matchPassword(password))) { // if user exists and the password matches
        generateToken(res, user._id); // generate a token
        res.status(200).json({ // return the user data
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else { // if user does not exist or the password does not match
        res.status(401)
        throw new Error("Invalid email or password");
    }


});

// @desc: Register a new user
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler (async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) { // if user already exists
        res.status(400)
        throw new Error("User already exists");
    }

    const user = await User.create({ // create a new user
        name,
        email,
        password
    });

    if (user) { // if user is created
        generateToken(res, user._id); // generate a token
        res.status(201).json({ // return the user data
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else { // if user is not created
        res.status(400)
        throw new Error("Invalid user data");
    }

});

// @desc: logout user
// @route: POST /api/users/logout
// @access: Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", { // set the token cookie to expire in 0 seconds
        expires: new Date(Date.now() + 0),
        httpOnly: true
    });
    res.status(200).json({message: "User logged out"});
});

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private - need a valid token
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

// @desc: Update user profile
// @route: PUT /api/users/profile
// @access: Private - need a valid token
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // find the user by id

    if (user) {
        user.name = req.body.name || user.name; // if the name is provided, update the name
        user.email = req.body.email || user.email; // if the email is provided, update the email
        if (req.body.password) { // if the password is provided, update the password
            user.password = req.body.password;
        }

        const updatedUser = await user.save(); // save the updated user


        res.status(200).json({ // return the updated user data
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    }
});

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};