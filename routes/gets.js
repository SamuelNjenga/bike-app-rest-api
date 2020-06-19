const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Bike = require('../models/Bike');
const User = require('../models/User');

// router.get('/getCompanies', async (req, res) => {
//     try {
//         const companies = await Company.find();
//         res.json(companies);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// router.get('/getBikes', async (req, res) => {
//     try {
//         const bikes = await Bike.find();
//         res.json(bikes);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// router.get('/getDescription', async (req, res) => {
//     try {
//         const bikes = await Bike.find({}).select('keyFeatures bikeDescription -_id');
//         res.json(bikes);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// router.get('/getDescription', async (req, res) => {
//     try {
//         const bikes = await Bike.find({}).select({"keyFeatures":1,"_id":0,"bikeDescription":1});
//         res.json(bikes);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// router.get('/getDescription/:_id', async (req, res) => {
//     try {
//         const bikes = await Bike.find({_id:req.params._id},'bikeDescription -_id');
//         res.json(bikes);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// router.get('/companiesAndbikes', async (req, res) => {
//     try {
//         const companyAndBike = await Company.find().populate('bikes');
//         res.json(companyAndBike);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// router.get('/getUsers', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

// router.get('/getUserById/:email', async (req, res) => {
//     try {
//         const users = await User.findOne({email:req.params.email});
//         res.json(users);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });
module.exports = router;