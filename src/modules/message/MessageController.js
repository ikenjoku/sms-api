import Message from '../../data/models/message';
import User from '../../data/models/user';


class MessageController {
  static async sendMessage(req, res, next) {
    const { text, senderId } = req.body;
    if (!text || !senderId) {
      const err = new Error('Please specify a message to send');
      err.status = 400;
      next(err);
    } else {
      const newMessage = new Message(req.body);
      newMessage.save((err, message) => {
        if (err) return next(err);
        return res.status(201).json({
          message: 'Message has been sent',
          record: message,
        });
      });
    }
  }
}
export default MessageController;
