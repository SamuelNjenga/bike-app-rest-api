const Bike = require('../models/Bike')
const BikeSelling = require('../models/BikeSelling')


exports.patchBikeSelling = async (req, res) => {
    try {
        const updatedBikeSelling = await BikeSelling.updateOne({
            bikeId: req.params.id
        }, {
            $inc: {
                soldItems: req.body.count,
                remainingItems: -req.body.count
            }
        });
        res.json(updatedBikeSelling);
    } catch (err) {
        res.json({
            message: err
        });
    }
}