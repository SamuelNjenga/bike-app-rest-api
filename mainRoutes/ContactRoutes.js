const express = require('express');
const router = express.Router();
const regLoginController = require('../controllers/RegLoginController');
const contactController = require('../controllers/ContactController');

router.post('/contact', regLoginController.allowIfLoggedin, regLoginController.grantAccess('readAny', 'profile'), contactController.postContact);

module.exports = router;