const APIPREFIX = '/api/v1';

const routes = (app) => {
  app.use(APIPREFIX, (req, res, next) => {
    return res.status(200).json({
      message: 'It is working',
    });
  });

  return app;
};

export default routes;
