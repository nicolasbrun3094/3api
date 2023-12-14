const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API', () => {
  let createdUserId;

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/users/register')
      .send({
        email: 'testuser@example.com',
        pseudo: 'testuser',
        password: 'password123',
        role: 'user',
        employee: true,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email').equal('testuser@example.com');
        expect(res.body).to.have.property('pseudo').equal('testuser');
        createdUserId = res.body._id; // Stocke l'ID de l'utilisateur créé pour les tests ultérieurs
        done();
      });
  });

  it('should log in a user', (done) => {
    chai.request(app)
      .post('/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('Logged in successfully');
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('email').equal('testuser@example.com');
        expect(res.body.user).to.have.property('pseudo').equal('testuser');
        done();
      });
  });

  it('should get a user by ID', (done) => {
    chai.request(app)
      .get(`/api/users/${createdUserId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email').equal('testuser@example.com');
        expect(res.body).to.have.property('pseudo').equal('testuser');
        done();
      });
  });

  it('should update a user by ID', (done) => {
    chai.request(app)
      .put(`/api/users/${createdUserId}`)
      .send({
        pseudo: 'updateduser',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('pseudo').equal('updateduser');
        done();
      });
  });

  it('should delete a user by ID', (done) => {
    chai.request(app)
      .delete(`/api/users/${createdUserId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User deleted successfully');
        done();
      });
  });
});
