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
    const {comment, userFullName, userProfileImage, username, ideaId} = commentDetails;
    const response = await this.create({comment, userFullName, username, userProfileImage, ideaId});

    return response;
} 

commentSchema.statics.getComments = async function(ideaId) {
    const comments = await this.find({ideaId});
    if(!comments) {
        throw Error('Comments not found')
    }
    return comments;
} 

commentSchema.statics.updateComment = async function(commentId, commentText) {
    const comment = await this.find({_id: commentId});
    if(!comment) {
        throw Error('Comment not found');
    }
    const response = await this.findByIdAndUpdate(commentId, {comment: commentText}, {new: true});

    return response;
} 

commentSchema.statics.deleteComment = async function(commentId) {
    const comment = await this.find({_id: commentId});
    if(!comment) {
        throw Error('Comment not found');
    }
    const response = await this.deleteOne({_id: commentId})

    return response;
}

module.exports = mongoose.model('Comment', commentSchema);