const Company = require('../models/Company');

exports.deleteCompany = async (req, res) => {
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
};
