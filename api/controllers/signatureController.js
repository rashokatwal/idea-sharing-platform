const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

const generateSignature = async (req, res) => {
    const publicId = `user_${req.query.userId}`;
    const timestamp = Math.round(new Date().getTime() / 1000);

    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}`;
    const signature = crypto
        .createHash("sha1")
        .update(stringToSign + process.env.CLOUD_API_SECRET)
        .digest("hex");

    res.json({ signature, timestamp, public_id: publicId });
};

module.exports = { generateSignature }