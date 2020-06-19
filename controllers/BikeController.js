const Bike = require('../models/Bike')
const Company = require('../models/Company')


exports.deleteBike = async (req, res) => {
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
};

exports.getDescription = async (req, res) => {
    try {
        const bikes = await Bike.find({_id:req.params._id},'bikeDescription -_id');
        res.json(bikes);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

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