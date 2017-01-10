const chalk = require('chalk');
const should = require('should');
const models = require('../integration/models'); // eslint-disable-line
const mockgoose = require('mockgoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = mongoose.model('User');
const Document = mongoose.model('Document');
const mdb = require('../../utils/mongodb');

before((done) => {
  mockgoose(mongoose).then(() => {
    mongoose.connect('mongodb://example.com/testing', (err) => {
      console.log(chalk.green('Connected to Mock Database'));
      done(err);
    });
  });
});

describe('MongoDB', () => {
  const user = {
    username: 'cookies@gmail.gov',
    password: 'very_secure',
    full_name: 'Cookie Monster'
  };
  describe('Required Field', () => {
    const requiredFieldTable = mdb.requiredField;
    const requiredFields = Object.keys(requiredFieldTable);
    requiredFields.forEach((f) => {
      const expectedCode = requiredFieldTable[f];
      it(`missing ${f} should return error code ${expectedCode}`, () => {
        const userWithMissingField = Object.assign({}, user);
        userWithMissingField[f] = undefined;
        return User.create(userWithMissingField)
          .then((u) => {
            /* istanbul ignore next */
            return should.not.exist(u);
          })
          .catch((e) => {
            const code = mdb._handleValidationError(e);
            Number(code).should.be.equal(expectedCode);
          });
      });
    });

    it('should not error if required fields are provided', () => {
      return User.create(user)
        .then(u => should.exist(u._id))
        .catch((e) => {
          /* istanbul ignore next */
          should.not.exist(e);
        });
    });
  });

  describe('Custom Validation', () => {
    it('should return a code if validation fails', () => {
      const invalidUser = Object.assign({}, user, { username: 'INVALID_FORMAT' });
      const invalidUserErrorCode = 201;
      return User.create(invalidUser)
        .then((u) => {
          /* istanbul ignore next */
          return should.not.exist(u);
        })
        .catch((e) => {
          e.should.be.a.Error();
          const code = mdb._handleValidationError(e);
          Number(code).should.be.equal(invalidUserErrorCode);
        });
    });
  });

  describe('Entity Not Found', () => {
    const fakeId = '58741c35741c1b000198837e';
    const categories = mdb.notFound;
    const notFoundEntities = Object.keys(categories);
    notFoundEntities.forEach((c) => {
      const expectedCode = categories[c];
      it(`${c} not found should return error code ${expectedCode}`, () => {
        return User.findById(fakeId)
          .then(d => mdb.handleEntityNotFound(d, c))
          .catch((e) => {
            const code = e.message;
            Number(code).should.be.equal(expectedCode);
          });
      });
    });

    it('should not error and return entity if found', () => {
      return User.create(user)
        .then(u => User.findById(u._id))
        .then(u => mdb.handleEntityNotFound(u, 'userId'))
        .then(u => should.exist(u._id))
        .catch((e) => {
          /* istanbul ignore next */
          should.not.exist(e);
        });
    });
  });

  describe('Validate ObjectID', () => {
    const validObjectId = '58741c35741c1b000198837e';
    const invalidObjectId = `${validObjectId}+INVALID`;
    it('invalid ObjectID should return error code 150', () => {
      const expectedCode = 150;
      return mdb.validateObjectID(invalidObjectId)
        .then((id) => {
          /* istanbul ignore next */
          return should.not.exist(id);
        })
        .catch((e) => {
          const code = e.message;
          Number(code).should.be.equal(expectedCode);
        });
    });

    it('should not error and return id if ObjectID is valid', () => {
      return mdb.validateObjectID(validObjectId)
        .then(id => id.should.equal(validObjectId))
        .catch((e) => {
          /* istanbul ignore next */
          should.not.exist(e);
        });
    });
  });

  const title = 'Secret File';
  const owner = { username: 'ceo@gmail.gov' };
  const nonOwner = { username: 'intern@gmail.gov' };
  before((done) => {
    Document.create({ title, owner })
      .then(() => done());
  });

  describe('Validate Owner', () => {
    it('should not provide access if user does not own document', () => {
      const expectedCode = 350;
      return Document.findOne({ title })
        .then(mdb.validateOwner(nonOwner))
        .then((d) => {
          /* istanbul ignore next */
          return should.not.exist(d);
        })
        .catch((e) => {
          const code = e.message;
          Number(code).should.equal(expectedCode);
        });
    });

    it('should not error and return document if user is owner', () => {
      return Document.findOne({ title })
        .then(mdb.validateOwner(owner))
        .then(d => d.owner.username.should.equal(owner.username))
        .catch((e) => {
          /* istanbul ignore next */
          should.not.exist(e);
        });
    });
  });
});
