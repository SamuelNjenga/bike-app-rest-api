const express = require('express');
const router = express.Router();
const userController = require('../controllers/RegLoginController');
const bikeController = require('../controllers/BikeController');

router.get('/bikes',bikeController.getBikes);

router.post('/bike', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), bikeController.postBike);

router.get('/description/:_id',bikeController.getDescription);

router.delete('/bike/:postId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), bikeController.deleteBike);

module.exports = router;