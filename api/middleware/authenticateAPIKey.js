const bcrypt = require('bcrypt');
const ApiKey = require('../models/apiKeyModel');

const authenticateAPIKey = async (req, res, next) => {
    const apiKey = req.header("APIKey");
    if (!apiKey) return res.status(403).json({ error: "Missing API Key" });

    const storedKeys = await ApiKey.find();
    const isValidKey = await Promise.all(storedKeys.map(async (stored) => bcrypt.compare(apiKey, stored.key)));

    if (!isValidKey.includes(true)) {
        return res.status(403).json({ error: "Unauthorized: Invalid API Key" });
    }

    next();
}

module.exports = authenticateAPIKey;