import User from '../../data/models/user';

class UserController {
  static async signUpUser(req, res) {
    const {
      username, email, password,
    } = req.body;

    return res.status(201).json({
      success: true,
      message: 'Create a user',
    });
  }

  static async loginUser(req, res) {
    return res.status(201).json({
      success: true,
      message: 'login a user',
    });
  }
}
export default UserController;
