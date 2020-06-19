const express = require('express');
const router = express.Router();
const regLoginController = require('../controllers/RegLoginController');
const companyController = require('../controllers/CompanyController');

// router.get('/bikes', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), bikeController.getBikes);

router.delete('/company/:postId', regLoginController.allowIfLoggedin, regLoginController.grantAccess('deleteAny', 'profile'), companyController.deleteCompany);

module.exports = router;