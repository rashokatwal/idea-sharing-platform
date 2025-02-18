const express = require('express');
const {
    getIdeas,
    getIdea,
    postIdea,
    updateIdea,
    deleteIdea,
    likeIdea
} = require('../controllers/ideaController');
const authenticateAPIKey = require('../middleware/authenticateAPIKey');

// const dbMiddleware = require('../middleware/dbMiddleware');

const router = express.Router();

router.use(authenticateAPIKey);

router.get('/ideas', getIdeas);

router.get('/idea/:id', getIdea);

router.post('/idea', postIdea);

router.patch('/idea/:id', updateIdea);

router.patch('/likeIdea', likeIdea);

router.delete('/idea/:id', deleteIdea);

module.exports = router;