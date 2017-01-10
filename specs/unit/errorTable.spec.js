const should = require('should');
const errorTable = require('../../errorTable');

describe('Error Table', () => {
  it('should be an object', () => {
    should(errorTable).be.a.Object();
  });

  const keys = Object.keys(errorTable);
  it('should have valid keys', () => {
    keys.forEach((k) => {
      Number(k).should.be.a.Number();
      Number(k).should.not.be.NaN();
    });
  });

  it('should have a meta field', () => {
    keys.forEach((k) => {
      const meta = errorTable[k].meta;
      should.exist(meta);
      should(meta).be.a.Object();
    });
  });

  it('should have code, error_type, error_message fields', () => {
    keys.forEach((k) => {
      const meta = errorTable[k].meta;
      should.exist(meta.code);
      should.exist(meta.error_type);
      should.exist(meta.error_message);
    });
  });

  it('code, error_type, error_message fields should be proper types', () => {
    keys.forEach((k) => {
      const meta = errorTable[k].meta;
      meta.code.should.be.a.Number();
      meta.error_type.should.be.a.String();
      meta.error_message.should.be.a.String();
    });
  });
});
