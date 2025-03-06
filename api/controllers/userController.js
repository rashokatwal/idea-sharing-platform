const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

const signinUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signin(email, password);

        const userId = user._id;

        const token = createToken(userId);

        const updatedUserDetails = user.toObject();

        delete updatedUserDetails.password;
        
        updatedUserDetails.token = token;

        res.status(200).json(updatedUserDetails);
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const signupUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.signup(email, password);

        const userId = user._id;

        const token = createToken(userId);

        // const profileCompleted = user.profileCompleted;

        const updatedUserDetails = user.toObject();

        delete updatedUserDetails.password;

        updatedUserDetails.token = token;

        console.log(updatedUserDetails);

        res.status(200).json(updatedUserDetails);
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const updateUserDetails = async (req, res) => {
    const updates = req.body;
    console.log(req.body);

    try {
        const user = await User.updateDetails(updates, req.params.id);

        const updatedUserDetails = user.toObject();
        delete updatedUserDetails.password;

        res.status(200).json({updatedUserDetails});
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const getUserDetails = async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.getDetails(username);
        // console.log(user);
        res.status(200).json(user);
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const getUserPosts = async (req, res) => {
    const username = req.params.username;
    const filter = req.query.filter;

    try {
        const user = await User.getDetails(username);
        const filteredPosts = filter == "All" ? user.postedIdeas.filter((idea) => idea.status !== "Draft") : user.postedIdeas.filter((idea) => idea.status === filter);

        res.status(200).json(filteredPosts);
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const getUserLikedPosts = async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.getDetails(username);

        res.status(200).json(user.likedIdeas);
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const getUserSavedPosts = async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.getDetails(username);

        res.status(200).json(user.savedIdeas);
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

module.exports = { signinUser, signupUser, updateUserDetails, getUserDetails, getUserLikedPosts, getUserSavedPosts, getUserPosts }