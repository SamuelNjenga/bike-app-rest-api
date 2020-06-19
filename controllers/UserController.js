const User = require('../models/User1');


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
