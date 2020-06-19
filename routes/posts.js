const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Bike = require('../models/Bike');
const Contact = require('../models/Contact');
const {contactValidation} = require('./validation')
const {authRole} = require('../authentication/authentication')
const {roles} = require('../rolesAuthentication/roles')

const app1 = new express();
app1.use(allowIfLoggedin)
app1.use(grantAccess)

router.post('/company', async (req, res) => {

    const company = new Company({
        companyName: req.body.companyName,
        companyEmail: req.body.companyEmail
    });
    try {
        const savedObject = await company.save();
        res.json(savedObject);
        console.log('Hitted')
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/contact', async (req, res) => {

    const {
		error
	} = contactValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    try {
        const savedObject = await contact.save();
        res.json(savedObject);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

function allowIfLoggedin (req, res, next) {
    try {
      const user = res.locals.loggedInUser;
      if (!user)
        return res.status(401).json({
          error: "You need to be logged in to access this route"
        });
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }

 function grantAccess (action, resource) {
    return async (req, res, next) => {
      try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action"
          });
        }
        next()
      } catch (error) {
        next(error)
      }
    }
  }

  router.get('/getBiks',allowIfLoggedin,grantAccess('readAny', 'profile'), async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.json(bikes);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/bike',authRole(), async (req, res) => {

    const bike = new Bike({
        bikeType: req.body.bikeType,
        brandName: req.body.brandName,
        bikeDescription: req.body.bikeDescription,
        keyFeatures: req.body.keyFeatures,
        specifications: req.body.specifications,
        price: req.body.price,
        companyId: req.body.companyId
    });
    try {
        const savedObject = await bike.save();
        let b = savedObject._id;
        const updatedCompany = await Company.updateOne({
            _id: req.body.companyId
        }, {
            $push: {
                bikes: [{
                    _id: b
                }]
            }
        });
        res.json(updatedCompany);
    } catch (err) {
        res.json({
            message: err
        });
    }
});




module.exports = router;