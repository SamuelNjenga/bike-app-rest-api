const cors = require('cors');
require('dotenv/config');

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { v4: uuidv4 } = require('uuid');

//Routes
router.post('/payment', (req, res) => {
	const { totalPrice, token } = req.body;
	const idempontencyKey = uuidv4();
	console.log(idempontencyKey);
	return stripe.customers.create({
			email: token.email,
			source: token.id
		}).then((customer) => {
			stripe.charges.create(
				{
					amount: totalPrice * 100,
					currency: 'usd',
					customer: customer.id,
					receipt_email: token.email,
					// description: `purchase of ${product.name}`,
					shipping: {
						name: token.card.name,
						address: {
							country: token.card.address_country
						}
					}
				},
				{
					idempontencyKey
				}
			);
		}).then((result) => res.status(200).json(result)).catch((err) => console.log(err));
});

module.exports = router;
