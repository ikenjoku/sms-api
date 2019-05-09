import { SchemaTypes } from 'mongoose';

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  recipientId: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Delivered',
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
