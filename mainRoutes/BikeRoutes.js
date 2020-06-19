const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');
const bikeController = require('../controllers/BikeController');

router.get('/bikes', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), bikeController.getBikes);
module.exports = router;