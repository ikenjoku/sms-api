import Message from '../../data/models/message';

class MessageController {
  static sendMessage(req, res, next) {
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

  static getMessages(req, res, next) {
    const { userId } = req.params;
    const { type } = req.query;
    const searchParam = type === 'sent' ? { senderId: userId } : { recipientId: userId };
    const typeString = type === 'sent' ? 'sent' : 'recieved';

    Message.find(searchParam, (err, messages) => {
      if (err) return next(err);

      if (!messages.length) {
        return res.status(200).json({
          message: `You have not ${typeString} any message`,
          messages,
        });
      }

      return res.status(200).json({
        message: `Successfully retrieved ${typeString} messages`,
        messages,
      });
    });
  }

  static readMessage(req, res, next) {
    // update status to Seen
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
    // delete a message
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
