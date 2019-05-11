import express from 'express';
import UserController from './UserController';
import validators from '../../middlewares/validators';

const Router = express.Router();

Router.post(
  '/register',
  validators.validateUserSignUp,
  UserController.registerUser,
);

Router.post(
  '/login',
  validators.validateUserLogin,
  UserController.loginUser,
);

export default Router;
