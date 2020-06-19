const Bike = require('../models/Bike')

exports.getBikes = async (req, res, next) => {
    try {
      const bikes = await Bike.find({});
      res.status(200).json({
        data: bikes
      })
    } catch (err) {
      res.json({
        message: err
      });
    }
  }