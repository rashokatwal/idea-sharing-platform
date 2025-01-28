const express = require('express');
const {
    getIdeas,
    getIdea,
    postIdea,
    updateIdea,
    deleteIdea
} = require('../controllers/ideaController');

// const dbMiddleware = require('../middleware/dbMiddleware');

const router = express.Router();

// router.use(dbMiddleware);

router.get('/ideas', getIdeas);

router.get('/idea/:id', getIdea);

router.post('/idea', postIdea);

router.patch('/idea/:id', updateIdea);

router.delete('/idea/:id', deleteIdea);

module.exports = router;