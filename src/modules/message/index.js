import express from 'express';
import UserController from './MessageController';
import validateRecipient from '../../middlewares/validateRecipient';

const Router = express.Router();

// Send a message a user POST /messages
Router.post(
  '/messages',
  validateRecipient,
  UserController.sendMessage,
);
// Send message all for a user GET /messages:id

// Read a message  PUT /message/:id/read

// Mark all as read PUT/message/read-all

export default Router;
