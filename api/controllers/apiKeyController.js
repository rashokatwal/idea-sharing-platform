const crypto = require("crypto");
const bcrypt = require("bcrypt");

const ApiKey = require('../models/apiKeyModel');

const generateApiKey = async (req, res) => {
    const rawKey = crypto.randomBytes(32).toString("hex");
    const hashedKey = await bcrypt.hash(rawKey, 10);

    await ApiKey.create({ key: hashedKey })
            .then(() => {
                res.status(201).json({key: rawKey, message: "Store this API key securely. It won't be shown again!"});
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({error: "Couldn't generate API Key"});
            })
};

module.exports = { generateApiKey };