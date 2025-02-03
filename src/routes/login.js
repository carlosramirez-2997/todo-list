const express = require('express');

const router = express.Router();
const loginController = require('../controllers/login.js');

router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLogin);

router.get('/logout', loginController.getLogout);

router.get('/', loginController.getIndex);

module.exports = router;