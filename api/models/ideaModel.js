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
        required: true
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
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    comments: {
        type: Number,
        required: true
    },
    reads: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    lastUpdatedOn: {
        type: Date,
        required: true
    },
    postedOn: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Idea', ideaSchema)