const express = require('express');
const router = express.Router();
const regLoginController = require('../controllers/RegLoginController');
const companyController = require('../controllers/CompanyController');

 router.get('/companies', regLoginController.allowIfLoggedin, regLoginController.grantAccess('readAny', 'profile'), companyController.getCompanies);

 router.post('/company', regLoginController.allowIfLoggedin, regLoginController.grantAccess('readAny', 'profile'), companyController.postCompany);

 router.get('/companiesAndBikes', regLoginController.allowIfLoggedin, regLoginController.grantAccess('readAny', 'profile'), companyController.getCompaniesAndBikes);

router.delete('/company/:postId', regLoginController.allowIfLoggedin, regLoginController.grantAccess('deleteAny', 'profile'), companyController.deleteCompany);

module.exports = router;