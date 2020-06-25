const express = require('express');
const router = express.Router();
const regLoginController = require('../controllers/RegLoginController');
const userController = require('../controllers/UserController');

router.get('/user/:userId', regLoginController.allowIfLoggedin, userController.getUser);

router.get('/getUserById/:email', userController.getUserByEmail);

router.patch('/user/:email', regLoginController.allowIfLoggedin, regLoginController.grantAccess('updateAny', 'profile'), userController.patchUser);

router.patch('/:email', regLoginController.allowIfLoggedin, regLoginController.grantAccess('updateAny', 'profile'), userController.patchPassword);

router.put('/user/:userId', regLoginController.allowIfLoggedin, regLoginController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', regLoginController.allowIfLoggedin, regLoginController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.get('/users', userController.getUsers);

module.exports = router;