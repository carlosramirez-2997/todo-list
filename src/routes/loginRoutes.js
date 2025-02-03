const express = require('express');

const router = express.Router();
const loginController = require('../controllers/loginController.js');

router.get('/', loginController.getIndex);

router.get('/login', loginController.getLogin);

router.post('/login', loginController.postLogin);

module.exports = router;