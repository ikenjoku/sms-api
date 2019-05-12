import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();
chai.should();
chai.use(chaiHttp);

describe('Authentication', () => {
  before((done) => {
    mongoose.connect(process.env.MONGO_TEST_DB_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      db.db.dropDatabase(() => {
        done();
      });
    });
  });

  describe('Users', () => {
    it('should be able to register', (done) => {
      const user = {
        username: 'Bobby',
        email: 'bob@gmail.com',
        phone: '234803453324',
        password: '1234qwerty',
        confirmPassword: '1234qwerty',
      };
      chai.request(app)
        .post('/api/v1/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.eql('Successfully registered');
          res.body.user.username.should.eql('Bobby');
          res.body.user.phone.should.eql(234803453324);
          res.body.should.have.property('token');
          done();
        });
    });

    it('should be able to login', (done) => {
      const user = {
        email: 'bob@gmail.com',
        password: '1234qwerty',
      };
      chai.request(app)
        .post('/api/v1/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Welcome back Bobby');
          res.body.should.have.property('token');
          done();
        });
    });
  });
});
