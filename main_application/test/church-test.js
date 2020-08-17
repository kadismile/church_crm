const server = require("../server");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const User = require('../models/User');

beforeEach(function () {

});

afterEach(function () {

});

let church = {
  "_id": "K7NXaUYI99ZALlMPKg",
  "email": "churchofgod@yahoo.com",
  "name": "Church of God",
  "phoneNumber": "07067875047",
  "address": {
    "country": "Nigeria",
    "address": "Area 2 Garki Abuja",
    "countryCode": "NG"
  },
  "password": "111222",
  "role": ["superAdmin"],
  "category": {
    "name": "superAdmin"
  },
  "superAdmin": true
};
let token;
exports.churchTest = () =>
    describe("Describe the basic nature of Tests for church", () => {
      
      it("Creates a Church", done => {
        chai
            .request(server)
            .post("/api/v1/auth/church/register")
            .send(church)
            .then( async (res) => {
              chai.expect(res.status).to.eql(201); // expression which will be true if response status equal to 201
              delete church.password;
              chai.assert.exists(res.body.data._id); // assertion expression which will be true if id exists
              done();
            })
            .catch(done);
      });
  
      it("Gets Auth token", done => {
        let church = {
          "_id": "K7NXaUYI99ZALlMPKg",
          "email": "churchofgod@yahoo.com",
          "name": "Church of God",
          "phoneNumber": "07067875047",
          "address": {
            "country": "Nigeria",
            "address": "Area 2 Garki Abuja",
            "countryCode": "NG"
          },
          "password": "111222",
          "role": ["superAdmin"],
          "category": {
            "name": "superAdmin"
          },
          "superAdmin": true
        };
        const { email, password } = church;
        chai
            .request(server)
            .post("/api/v1/auth/login")
            .send({ email, password })
            .then((res) => {
              chai.expect(res.status).to.eql(200); // expression which will be true if response status equal to 201
              token = res.body.token;
              done();
            })
            .catch(done);
      });
  
      it("it should find a user created by the church", done => {
        chai
            .request(server)
            .post(`/api/v1/users/get`)
            .set("Authorization", `Bearer ${token}`)
            .then((res) => {
              chai.expect(res.status).to.eql(200); // expression which will be true if response status equal to 201
              chai.assert.isObject(res.body.user); // assertion expression which will be true if id exists
              done();
            })
            .catch(done);
      });
      
    });
