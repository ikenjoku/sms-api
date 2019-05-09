import UserRouter from './message';
import MessageRouter from './user';

const APIPREFIX = '/api/v1';

const routes = (app) => {
  app.use(APIPREFIX, UserRouter);
  app.use(APIPREFIX, MessageRouter);
  return app;
};

export default routes;
