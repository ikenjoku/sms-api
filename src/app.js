import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import modules from './modules';

dotenv.config();
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect to database
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGO_PROD_DB_URL, { useNewUrlParser: true });
} else if (process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.MONGO_DEV_DB_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  // mongo logs
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => { console.log('DB connection established'); });
} else {
  mongoose.connect(process.env.MONGO_TEST_DB_URL, { useNewUrlParser: true });
}
// handle routes
modules(app);

// handle 404 error
app.use((req, res, next) => {
  const pageNotFound = new Error('There is no page here');
  pageNotFound.status = 404;
  next(pageNotFound);
});

// Catch all errors
app.use((err, req, res, next) => res.status(err.status || 500).json({
  status: err.status,
  message: err.message,
  stack: err.stack,
}));

export default app;
