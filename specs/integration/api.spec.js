const chalk = require('chalk');
const should = require('should');
const models = require('./models'); // eslint-disable-line
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Document = mongoose.model('Document');
const request = require('supertest');
const app = require('./server/app');
const errorTable = require('../../errorTable');

before((done) => {
  app.listen(3000, () => {
    console.log(chalk.yellow('Connected to Mock Server'));
    done();
  });
});

describe('API Integration', () => {
  describe('Default', () => {
    it('should return error -1 if error is uncategorizable', (done) => {
      const expectedCode = -1;
      const expectedType = returnExpectedType(expectedCode);
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.meta.code.should.equal(expectedCode);
          res.body.meta.error_type.should.equal(expectedType);
          done();
        });
    });
  });

  const title = 'Secret File';
  const owner = { username: 'ceo@gmail.gov' };
  const nonOwner = { username: 'intern@gmail.gov' };
  let validObjectIdAndExists;

  before((done) => {
    Document.create({ title, owner })
      .then((d) => {
        validObjectIdAndExists = d._id;
        done();
      });
  });

  describe('Document Retrieval', () => {
    it('should return error 150 if ObjectID invalid', (done) => {
      const invalidObjectId = `${validObjectIdAndExists}+INVALID`;
      const expectedCode = 150;
      const expectedType = returnExpectedType(expectedCode);
      request(app)
        .get(`/document/${invalidObjectId}`)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.meta.code.should.equal(expectedCode);
          res.body.meta.error_type.should.equal(expectedType);
          done();
        });
    });

    it('should return error 160 if entity not found', (done) => {
      const validObjectIdButDoesNotExist = '58754c63082de3f14e4d1e71';
      const expectedCode = 160;
      const expectedType = returnExpectedType(expectedCode);
      request(app)
        .get(`/document/${validObjectIdButDoesNotExist}`)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.meta.code.should.equal(expectedCode);
          res.body.meta.error_type.should.equal(expectedType);
          done();
        });
    });

    it('should return permissions error 350 if user does not own document', (done) => {
      const expectedCode = 350;
      const expectedType = returnExpectedType(expectedCode);
      request(app)
        .get(`/document/${validObjectIdAndExists}`)
        .query({ user: nonOwner })
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.meta.code.should.equal(expectedCode);
          res.body.meta.error_type.should.equal(expectedType);
          done();
        });
    });

    it('should not error if all requirements are satisfied', (done) => {
      request(app)
        .get(`/document/${validObjectIdAndExists}`)
        .query({ user: owner })
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.title.should.equal(title);
          done();
        });
    });
  });

  describe('Document Creation', () => {
    it('should return error if missing required field', (done) => {
      const userWithMissingField = {
        username: 'cookies@gmail.gov',
        full_name: 'Cookie Monster'
      };
      const expectedCode = 205;
      const expectedType = returnExpectedType(expectedCode);
      request(app)
        .post('/user')
        .query({ user: userWithMissingField })
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.meta.code.should.equal(expectedCode);
          res.body.meta.error_type.should.equal(expectedType);
          done();
        });
    });

    it('should return error if custom validation fails', (done) => {
      const userWithInvalidUsername = {
        username: 'INVALID_FORMAT',
        password: 'very_secure',
        full_name: 'Cookie Monster'
      };
      const expectedCode = 201;
      const expectedType = returnExpectedType(expectedCode);
      request(app)
        .post('/user')
        .query({ user: userWithInvalidUsername })
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.meta.code.should.equal(expectedCode);
          res.body.meta.error_type.should.equal(expectedType);
          done();
        });
    });

    it('should not error if all requirements are satisfied', (done) => {
      const validUser = {
        username: 'cookies@gmail.gov',
        password: 'very_secure',
        full_name: 'Cookie Monster'
      };
      request(app)
        .post('/user')
        .query({ user: validUser })
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.username.should.equal(validUser.username);
          done();
        });
    });
  });
});

function returnExpectedType(code) {
  return errorTable[code].meta.error_type;
}
