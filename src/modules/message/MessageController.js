import Message from '../../data/models/message';

class MessageController {
  static async sendMessage(req, res) {
    const {
      username, email, password,
    } = req.body;

    return res.status(201).json({
      success: true,
      message: 'Create a message',
    });
  }
}
export default MessageController;
