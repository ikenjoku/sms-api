import express from 'express';
import UserController from './MessageController';

const Router = express.Router();

Router.get(
  '/messages',
  UserController.sendMessage,
);

// Router.get(
//   '/messages',
//   // retrieve messages
// );

export default Router;
