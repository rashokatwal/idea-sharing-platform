const commentsModel = require('../models/commentsModel');
const Comment = require('../models/commentsModel');

const postComment = async (req, res) => {
    const commentDetails = req.body;
    
    try {
        const comment = await Comment.addComment(commentDetails);

        console.log(comment);

        res.status(200).json({comment});
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

module.exports = { postComment, getComments }