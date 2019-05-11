import Message from '../../data/models/message';

class MessageController {
  static sendMessage(req, res, next) {
    const { text } = req.body;
    if (!text) {
      const err = new Error('Please specify a message to send');
      err.status = 400;
      next(err);
    } else {
      const { user } = req.user;
      const senderId = user._id;
      const recipientId = req.recipient._id;
      const newMessage = new Message({ text, senderId, recipientId });
      newMessage.save((err, message) => {
        if (err) return next(err);
        return res.status(201).json({
          message: 'Message has been sent',
          record: message,
        });
      });
    }
  }

  static getMessages(req, res, next) {
    const { userId } = req.params;
    const { type } = req;
    const searchParam = type === 'sent' ? { senderId: userId } : { recipientId: userId };

    Message.find(searchParam, (err, messages) => {
      if (err) return next(err);
      if (!messages.length) {
        return res.status(200).json({
          message: `You have not ${type} any message`,
          messages,
        });
      }
      return res.status(200).json({
        message: `Successfully retrieved ${type} messages`,
        messages,
      });
    });
  }

  static readMessage(req, res, next) {
    const { messageId } = req.params;
    Message.findById(messageId, (err, message) => {
      if (err) return next(err);
      message.status = 'Seen';
      message.save((error, msg) => {
        if (error) return next(error);
        res.status(200).json(msg);
      });
    });
  }

  static deleteMessage(req, res, next) {
    const { messageId } = req.params;
    Message.findByIdAndDelete(messageId, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: 'Successfully deleted',
      });
    });
  }
}
export default MessageController;
