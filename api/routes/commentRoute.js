const express = require('express');
const { postComment, getComments, deleteComment, updateComment } = require('../controllers/commentsController');

const authenticateUser = require('../middleware/authenticateUser');

const authenticateAPIKey = require('../middleware/authenticateAPIKey');

const router = express.Router();

// router.use(autheticateUser);

router.post('/comment', authenticateUser, postComment);

router.get('/comments/:id', authenticateAPIKey, getComments);

router.patch('/comment', authenticateUser, updateComment);

router.delete('/comment', authenticateUser, deleteComment);

module.exports = router;