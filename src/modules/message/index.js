import express from 'express';
import MessageController from './MessageController';
import tokenizer from '../../helpers/tokenizer';
import validateRecipient from '../../middlewares/validateRecipient';

const Router = express.Router();

// Send a message to a contact
Router.post(
  '/messages',
  tokenizer.verifyToken,
  validateRecipient,
  MessageController.sendMessage,
);

// Get all messages sent by a user GET /messages?type=sent
// Get all messages recieved by a user GET /messages?type=recieved
Router.get(
  '/contacts/:userId/messages',
  tokenizer.verifyToken,
  MessageController.getMessages,
);

// Read a message  PUT /message/:id/read
Router.put(
  '/contacts/:userId/messages/:messageId/read',
  tokenizer.verifyToken,
  MessageController.readMessage,
);

// Delete a message DELETE /message/:id
Router.delete(
  '/contacts/:userId/messages/:messageId',
  tokenizer.verifyToken,
  MessageController.deleteMessage,
);

export default Router;
