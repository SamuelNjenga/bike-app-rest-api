const User = require('../models/User');

exports.getUserByEmail = async (req, res) => {
  try {
    const users = await User.findOne({
      email: req.params.email
    });
    res.json(users);
  } catch (err) {
    res.json({
      message: err
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User does not exist'));
    res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const {
      role,
      email
    } = req.body
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, {
      role,
      email
    });
    const user = await User.findById(userId)
    res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error)
  }
}


exports.patchUser = async (req, res) => {
  try {
    const updatedPassword = await User.updateOne({
      email: req.params.email
    }, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email
      }
    });
    res.json(updatedPassword);
  } catch (err) {
    res.json({
      message: err
    });
  }
}

exports.patchPassword = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const updatedPassword = await User.updateOne({
      email: req.params.email
    }, {
      $set: {
        password: hashedPassword
      }
    });
    res.json(updatedPassword);
  } catch (err) {
    res.json({
      message: err
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: 'User has been deleted'
    });
  } catch (error) {
    next(error)
  }
}

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users
  });
}