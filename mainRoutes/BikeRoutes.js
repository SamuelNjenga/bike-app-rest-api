const express = require('express');
const router = express.Router();
const userController = require('../controllers/RegLoginController');
const bikeController = require('../controllers/BikeController');

router.get('/bikes', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), bikeController.getBikes);

router.get('/getDescription/:_id', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), bikeController.getDescription);

router.delete('/bike/:postId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), bikeController.deleteBike);

module.exports = router;