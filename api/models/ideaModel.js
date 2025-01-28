const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ideaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        default: ""
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    reads: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["Open for Collaboration", "In Progress", "Completed", "Draft"],
        default: "Draft",
    },
    postedOn: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

module.exports = mongoose.model('Idea', ideaSchema)