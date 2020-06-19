const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
	registerValidation,
	loginValidation
} = require('../routes/validation');


router.post('/register', async (req, res) => {
	//LETS VALIDATE THE DATA BEFORE WE ADD A USER
	const {
		error
	} = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Checking if the user is already in the database
	const emailExist = await User.findOne({
		email: req.body.email
	});
	if (emailExist) return res.status(400).send('Email already exists');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Create a new user
	const user = new User({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
		email: req.body.email,
		gender:req.body.gender,
		role:req.body.role,
		password: hashedPassword
		
	});
	try {
		const savedObject = await user.save();
		res.json({
			user: savedObject._id
		});
	} catch (err) {
		res.json({
			message: err
		});
	}
});

router.post('/login', async (req, res) => {
	//LETS VALIDATE THE DATA BEFORE WE ADD A USER
	const {
		error
	} = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	//Checking if the email exists
	const user = await User.findOne({
		email: req.body.email
	});
	if (!user) return res.status(400).send('Email  is wrong');
	//PASSWORD IS CORRECT
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Invalid Password');
	//return res.json(user);
	//Create and assign a token
	const token = jwt.sign({
		_id: user._id
	}, process.env.TOKEN_SECRET);
	// res.status(200).json({
	// 	data: {
	// 	  email: user.email,
	// 	  role: user.role
	// 	},token})
	return res.header('auth-token', token).send(token);

	//res.send('Logged in');
});
module.exports = router;