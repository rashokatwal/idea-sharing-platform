const bcrypt = require('bcrypt');
const ApiKey = require('../models/apiKeyModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    const apiKey = req.header("APIKey");
    const userToken = req.header("userToken");
    if (!apiKey) return res.status(403).json({ error: "Missing API Key" });
    if (!userToken) return res.status(403).json({ error: "Missing User Token" });

    const storedKeys = await ApiKey.find();
    const isValidKey = await Promise.all(storedKeys.map(async (stored) => bcrypt.compare(apiKey, stored.key)));

    if (!isValidKey.includes(true)) {
        return res.status(403).json({ error: "Unauthorized: Invalid API Key" });
    }

    try {
        const {_id} = jwt.verify(userToken, process.env.SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next();
    } catch(error) {
        res.status(403).json({ error: "Unauthorized request" });
    }

}

module.exports = authenticateUser;