const app = require("./app");
const expect = require("chai").expect;
const sinon = require("sinon");
const request = require("request");

describe("User exists: Test user API", () => {
  before(() => {
    sinon.stub(request, "get").yields(
      null,
      null,
      JSON.stringify({
        id: 1,
        username: "Sinon here",
        email: "uma@sinon.com"
      })
    );
  });
  after(() => {
    request.get.restore();
  });
  it("Should get user by id", done => {
    app
      .getUserByID(1)
      .then(response => {
        expect(response.id).to.equal(1);
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  it("Should get title and email", done => {
    app
      .getUserByID(1)
      .then(response => {
        expect(response).to.have.property("username");
        expect(response).to.have.property("email");
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});

describe("User doesn't exist: Test user API", () => {
  before(() => {
    sinon.stub(request, "get").yields(null, null, JSON.stringify({}));
  });
  after(() => {
    request.get.restore();
  });
  it("Should get user by id", done => {
    app
      .getUserByID("uma")
      .then(response => {
        expect(response.id).to.equal(undefined);
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});
