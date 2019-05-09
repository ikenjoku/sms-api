import User from '../data/models/user';

const validateRecipient = (req, res, next) => {
  const { recipientId } = req.body;
  if (recipientId) {
    User.findById(recipientId, (err, recipient) => {
      if (err) return next(err);
      if (!recipient) {
        const noUserErr = new Error('Recipient is not available');
        noUserErr.status = 404;
        return next(noUserErr);
      }
      req.recipient = recipient;
      return next();
    });
  } else {
    const err = new Error('Please specify a recipient');
    err.status = 400;
    return next(err);
  }
};

export default validateRecipient;
