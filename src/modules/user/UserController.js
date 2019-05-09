import User from '../../data/models/user';

class UserController {
  static async signUpUser(req, res, next) {
    const { username, phone } = req.body;
    if (!username || !phone) {
      const err = new Error('All fields are required to signup');
      err.status = 400;
      next(err);
    } else {
      const newUser = new User(req.body);
      newUser.save((err, user) => {
        if (err) return next(err);
        return res.status(201).json(user);
      });
    }
  }

  static async loginUser(req, res) {
    return res.status(201).json({
      success: true,
      message: 'login a user',
    });
  }
}
export default UserController;
