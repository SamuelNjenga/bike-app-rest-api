const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Bike = require('../models/Bike');
const User = require('../models/User');

router.delete('/:postId', async (req, res) => {
    try {
        const removedUser = await User.remove({
            _id: req.params.postId
        });
        res.json(removedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.delete('/bikeDelete/:postId', async (req, res) => {
    try {
        const findBike = await Bike.findOne({
            _id: req.params.postId
        });
        console.log(findBike)
        let b = findBike._id;
        console.log('b is' + b);
        console.log('CompId is ' + findBike.companyId);
        const updatedCompany = await Company.updateOne({
            _id: findBike.companyId
        }, {
            $pullAll: {
                bikes: [{
                    _id: b
                }]
            }
        });
        const removedBike = await Bike.deleteOne({
            _id: req.params.postId
        });
        res.json(removedBike);

    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.delete('/companyDelete/:postId', async (req, res) => {
    try {
        const findCompany = await Company.findOne({
            _id: req.params.postId
        });
        console.log(findCompany)
        let b = findCompany._id;
        console.log('b is' + b);
        console.log('CompId is ' + findCompany.companyId);
        const deletedBikes = await Bike.deleteMany({
            companyId: b
        });
        const removedBike = await Company.deleteOne({
            _id: req.params.postId
        });
        res.json(removedBike);

    } catch (err) {
        res.json({
            message: err
        });
    }
});
module.exports = router;