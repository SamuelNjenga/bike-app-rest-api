const express = require('express');
const router = express.Router();
const userController = require('../controllers/RegLoginController');
const userC = require('../controllers/UserController');

router.get('/user/:userId', userController.allowIfLoggedin, userC.getUser);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userC.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userC.deleteUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userC.getUsers);

module.exports = router;