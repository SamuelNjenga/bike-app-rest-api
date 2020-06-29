const Contact = require('../models/Contact');
const {contactValidation} = require('../utils/validation');
require('dotenv/config');
const nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

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

    var mailOptions = {
        from: req.body.name,
        to: process.env.ACCOUNT,
        subject: 'MY_CUSTOMER_SUBJECT',
        html: `<p>${req.body.name}</p>
                <p>${req.body.email}</p>
                <p>${req.body.message}</p>`
      };
      smtpTransport.sendMail(mailOptions,
        (error, response) => {
          if(error) {
            console.log(error)
          }else {
           console.log('Success')
          }
          smtpTransport.close();
        });

        smtpTransport.sendMail({
            from: process.env.ACCOUNT,
            to: `${req.body.email}`,
            subject: "Your Submission was successful",
            text: `Thank you for contacting us!`
          }, function(error, info){
            if(error) {
              console.log(error);
            } else{
              console.log('Message sent: ' + info.response);
            }
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
