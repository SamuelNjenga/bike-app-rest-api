const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.get('/orders',orderController.getOrders);

router.get('/orders/:userId',orderController.getSpecificOrders);

router.post('/order/:customerId/:bikeId',  orderController.postOrder);


module.exports = router;