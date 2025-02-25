const express = require('express');
const { postComment, getComments, deleteComment } = require('../controllers/commentsController');

const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

// router.use(autheticateUser);

router.post('/comment', authenticateUser, postComment);

router.get('/comments/:id', getComments);

router.delete('/comment', deleteComment);

module.exports = router;