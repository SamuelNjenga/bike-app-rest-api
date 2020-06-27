const express = require('express');
const router = express.Router();
const sellingController = require('../controllers/BikeSellingController');

router.patch('/selling/:id',  sellingController.patchBikeSelling);

module.exports = router;