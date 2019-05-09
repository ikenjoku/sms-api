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

    Message.find(searchParam, (error, messages) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: `Unable to fetch your ${typeString} messages`,
          error,
        });
      }

      if (!messages.length) {
        return res.status(200).json({
          success: true,
          message: `You have not ${typeString} any message`,
          messages,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Successfully retrieved ${typeString} messages`,
        messages,
      });
    });
  }

  static readMessage() {
    // update status to seen
  }

  static deleteMessage() {
    // delete a message
  }
}
export default MessageController;
