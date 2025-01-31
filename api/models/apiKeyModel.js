const mongoose = require('mongoose')

const Schema = mongoose.Schema

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

module.exports = mongoose.model('ApiKey', apiKeySchema)