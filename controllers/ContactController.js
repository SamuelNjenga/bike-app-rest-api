const Contact = require('../models/Contact');
const {contactValidation} = require('../routes/validation')
exports.postContact = async (req, res) => {

    const {
		error
	} = contactValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    try {
        const savedObject = await contact.save();
        res.json(savedObject);
    } catch (err) {
        res.json({
            message: err
        });
    }
};
