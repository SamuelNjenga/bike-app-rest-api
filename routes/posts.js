const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Bike = require('../models/Bike');
const Contact = require('../models/Contact');
const {contactValidation} = require('./validation')


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

router.post('/bike', async (req, res) => {

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