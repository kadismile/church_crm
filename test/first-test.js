const server = require("../server");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

exports.firstTest = () =>
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      chai.assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });