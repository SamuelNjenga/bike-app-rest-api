const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');


router.post('/signupp', userController.signup);

router.post('/loginn', userController.login);

module.exports = router;