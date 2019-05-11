export default (req, res, next) => {
  const { type } = req.query;
  if (type.search(/^(sent|received)$/) === -1) {
    const err = new Error('Not found');
    err.status = 404;
    return next(err);
  }
  req.type = type;
  next();
};
