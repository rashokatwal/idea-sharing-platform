const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userFullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userProfileImage: {
        type: String,
        required: true
    },
    ideaId: {
        type: String,
        required: true
    }
}, { timestamps: true })

commentSchema.statics.addComment = async function(commentDetails) {
    const {comment, userFullName, username, ideaId} = commentDetails;
    const response = await this.create({comment, userFullName, username, userProfileImage, ideaId});

    return response;
} 

commentSchema.statics.getComments = async function(ideaId) {
    const comments = await this.find({ideaId});
    if(!comments) {
        return res.status(404).json({message: 'Comments not found.'});
    }
    return comments;
} 

module.exports = mongoose.model('Comment', commentSchema);