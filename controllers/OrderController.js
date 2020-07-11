const Bike = require('../models/Bike')
const BikeSelling = require('../models/BikeSelling')
const Order = require('../models/Order')

exports.postOrder = async (req, res) => {
    try {
        const order = new Order({
            customerId: req.params.customerId,
            bikeId: req.params.bikeId,
            numberOfItemsOrdered: req.body.count
        });
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

exports.getSpecificOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            customerId: req.params.userId
        });
        res.json(orders);
    } catch (err) {
        res.json({
            message: err
        });
    }
};