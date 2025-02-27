const commentsModel = require('../models/commentsModel');
const Comment = require('../models/commentsModel');
const Idea = require('../models/ideaModel');

const postComment = async (req, res) => {
    const commentDetails = req.body;
    
    try {
        const comment = await Comment.addComment(commentDetails);

        await Idea
                .updateOne({_id: commentDetails.ideaId}, { $inc: {comments: 1} })
                .then(result => {
                    // console.log(result);
                    res.status(200).json({comment});
                    // db.close();
                })
                .catch((err) => {
                    res.status(500).json({error: 'Error updating data'});
                    // db.close();
                })
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const getComments = async (req, res) => {
    const ideaId = req.params.id;

    try {
        const comments = await Comment.getComments(ideaId);

        console.log(commentsModel);

        res.status(200).json({comments});
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const updateComment = async (req, res) => {
    const {commentId, comment} = req.body;
    // console.log(req.body);

    try {
        const response = await Comment.updateComment(commentId, comment);

        res.status(200).json({response});
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

const deleteComment = async (req, res) => {
    const {commentId, ideaId} = req.body;

    try {
        const response = await Comment.deleteComment(commentId);

        await Idea.updateOne({_id: ideaId}, { $inc: {comments: -1} });

        res.status(200).json({response});
    }
    catch(error) {
        res.status(400).json(error.message);
    }
}

module.exports = { postComment, getComments, deleteComment, updateComment }