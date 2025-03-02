const express = require('express');
const {
    getIdeas,
    getIdea,
    postIdea,
    updateIdea,
    deleteIdea,
    likeIdea,
    saveIdea
} = require('../controllers/ideaController');
const authenticateAPIKey = require('../middleware/authenticateAPIKey');

// const dbMiddleware = require('../middleware/dbMiddleware');

const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.get('/ideas', authenticateAPIKey, getIdeas);

router.get('/idea/:id', authenticateAPIKey, getIdea);

router.post('/idea', authenticateUser, postIdea);

router.patch('/idea/:id', authenticateUser, updateIdea);

router.patch('/likeIdea', authenticateUser, likeIdea);

router.patch('/saveIdea', authenticateUser, saveIdea);

router.delete('/idea/:id', authenticateUser, deleteIdea);

module.exports = router;