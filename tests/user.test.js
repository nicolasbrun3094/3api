const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API', () => {
  let createdUserId;
  let authToken; // Pour stocker le token d'authentification

  it('should login and get authentication token', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@supinfo.com',
        pseudo: 'testuser',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Logged in successfully');
        expect(res.body).to.have.property('token');
        authToken = res.body.token; 
        done();
      });
  });
});