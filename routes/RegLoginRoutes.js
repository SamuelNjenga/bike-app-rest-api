const express = require('express');
const router = express.Router();
const regLoginController = require('../controllers/RegLoginController');

router.post('/signupp', regLoginController.signup);

router.post('/loginn', regLoginController.login);

module.exports = router;