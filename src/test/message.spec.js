import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from '../app';

dotenv.config();

chai.should();
chai.use(chaiHttp);

let contact1Token;
let contact1Id;

let contact2Token;
let contact2Id;

let messageId;

const contact1 = {
  username: 'Chubby',
  email: 'chubby@gmail.com',
  phone: '234803453343',
  password: 'pass1111',
  confirmPassword: 'pass1111',
};
const contact2 = {
  username: 'Kcee',
  email: 'kcee@gmail.com',
  phone: '234803453546',
  password: 'pass1234',
  confirmPassword: 'pass1234',
};
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

before((done) => {
  chai.request(app)
    .post('/api/v1/register')
    .send(contact1)
    .end((err, res) => {
      contact1Token = res.body.token;
      contact1Id = res.body.user.id;
      done();
    });
});

before((done) => {
  chai.request(app)
    .post('/api/v1/register')
    .send(contact2)
    .end((err, res) => {
      contact2Token = res.body.token;
      contact2Id = res.body.user.id;
      done();
    });
});

after((done) => {
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

describe('Authentication', () => {
  describe('Contacts', () => {
    it('should be able to send a message', (done) => {
      const message = {
        text: 'Hi, Jerry',
        recipientId: contact2Id,
      };
      chai.request(app)
        .post('/api/v1/messages')
        .set('x-access-token', contact1Token)
        .send(message)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.eql('Message has been sent');
          res.body.record.text.should.eql('Hi, Jerry');
          done();
        });
    });

    it('should be able to reply a message', (done) => {
      const message = {
        text: 'I am having a great time here',
        recipientId: contact1Id,
      };
      chai.request(app)
        .post('/api/v1/messages')
        .set('x-access-token', contact2Token)
        .send(message)
        .end((err, res) => {
          messageId = res.body.record._id;
          res.should.have.status(201);
          res.body.message.should.eql('Message has been sent');
          res.body.record.text.should.eql('I am having a great time here');
          done();
        });
    });

    it('should be able to get all sent messages', (done) => {
      chai.request(app)
        .get(`/api/v1/contacts/${contact2Id}/messages?type=sent`)
        .set('x-access-token', contact2Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.messages.length.should.eql(1);
          done();
        });
    });

    it('should be able to get all received messages', (done) => {
      chai.request(app)
        .get(`/api/v1/contacts/${contact2Id}/messages?type=received`)
        .set('x-access-token', contact2Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.messages.length.should.eql(1);
          done();
        });
    });

    it('should be able to read a message', (done) => {
      chai.request(app)
        .put(`/api/v1/contacts/${contact1Id}/messages/${messageId}/read`)
        .set('x-access-token', contact1Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.eql('Seen');
          done();
        });
    });

    it('should be able to delete a message', (done) => {
      chai.request(app)
        .delete(`/api/v1/contacts/${contact1Id}/messages/${messageId}`)
        .set('x-access-token', contact1Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Successfully deleted');
          done();
        });
    });
  });
});
