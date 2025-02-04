const express = require('express');

const router = express.Router();
const loginController = require('../controllers/login.js');

router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLogin);

router.get('/signup', loginController.getSignUp);

router.post('/signup', loginController.postSignUp);

router.get('/about', loginController.getAbout);

router.get('/logout', loginController.getLogout);

router.get('/', loginController.getIndex);

module.exports = router;