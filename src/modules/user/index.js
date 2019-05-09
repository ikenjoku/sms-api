import express from 'express';
import UserController from './UserController';

const Router = express.Router();

Router.get(
  '/signup',
  UserController.signUpUser,
);

Router.get(
  '/login',
  UserController.loginUser,
);

export default Router;
