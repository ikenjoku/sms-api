import bcrypt from 'bcrypt';
import tokenizer from '../../helpers/tokenizer';

import User from '../../data/models/user';

class UserController {
  static async registerUser(req, res) {
    const {
      username,
      phone,
      email,
      password,
    } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userParams = {
        username,
        phone,
        email,
        password: hashedPassword,
      };
      const newUser = await User.create(userParams);
      const token = await tokenizer.createToken(newUser);
      return res.status(201).json({
        message: 'Successfully registered',
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to register at this time',
        error,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { user } = req;
      delete user.password;
      const token = await tokenizer.createToken(user);
      return res.status(200).json({
        message: `Welcome back ${user.username}`,
        token,
        user: {
          id: user._id,
          username: user.username,
          phone: user.phone,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to perfom this action',
        error,
      });
    }
  }
}

export default UserController;
