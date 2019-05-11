import express from 'express';
import MessageController from './MessageController';
import tokenizer from '../../helpers/tokenizer';
import validateMessageType from '../../middlewares/validateMessageType';
import validateRecipient from '../../middlewares/validateRecipient';

const Router = express.Router();

Router.post(
  '/messages',
  tokenizer.verifyToken,
  validateRecipient,
  MessageController.sendMessage,
);

Router.get(
  '/contacts/:userId/messages',
  tokenizer.verifyToken,
  validateMessageType,
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
