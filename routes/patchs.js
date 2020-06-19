const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Bike = require('../models/Bike');
const User = require('../models/User');

/* Update the password*/
router.patch('/:email', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        const updatedPassword = await User.updateOne({
            email: req.params.email
        }, {
            $set: {
                password: hashedPassword
            }
        });
        res.json(updatedPassword);
    } catch (err) {
        res.json({
            message: err
        });
    }
});
// router.patch('/user/:email', async (req, res) => {
//     try {
//         const updatedPassword = await User.updateOne({
//             email: req.params.email
//         }, {
//             $set: {
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 userName: req.body.userName,
//                 email: req.body.email
//             }
//         });
//         res.json(updatedPassword);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// })
module.exports = router;