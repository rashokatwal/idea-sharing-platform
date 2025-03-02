const express = require('express');
const { signinUser, signupUser, updateUserDetails, getUserDetails, getUserLikedPosts, getUserSavedPosts } = require('../controllers/userController');

const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

// router.use(autheticateUser);

router.post('/auth/signin', signinUser);

router.post('/auth/signup', signupUser);

router.patch('/auth/updateUserDetails/:id', authenticateUser, updateUserDetails);

router.get('/user/:username', getUserDetails);

router.get('/likedPosts/:username', authenticateUser, getUserLikedPosts);

router.get('/savedPosts/:username', authenticateUser, getUserSavedPosts);

module.exports = router;