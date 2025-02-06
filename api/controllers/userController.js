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

        const profileCompleted = user.profileCompleted;

        res.status(200).json({email, token, userId, profileCompleted});
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

        const profileCompleted = user.profileCompleted;

        res.status(200).json({email, token, userId, profileCompleted});
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const updateUserDetails = async (req, res) => {
    const updates = req.body;

    try {
        const user = await User.updateDetails(updates, req.params.id);

        res.status(200).json(user);
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

module.exports = { signinUser, signupUser, updateUserDetails }