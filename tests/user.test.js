const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API', () => {
  let createdUserId;
  let authToken; // Pour stocker le token d'authentification

  it('should register a new user and get authentication token', (done) => {
    chai.request(app)
      .post('/api/users/register')
      .send({
        email: 'testuser@supinfo.com',
        pseudo: 'testuser',
        password: 'password123',
        role: 'admin',
        employee: true,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email').equal('testuser@supinfo.com');
        expect(res.body).to.have.property('pseudo').equal('testuser');
        createdUserId = res.body._id;

        
        chai.request(app)
          .post('/api/users/login')
          .send({
            email: 'testuser@supinfo.com',
            password: 'password123',
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Logged in successfully');
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('email').equal('testuser@supinfo.com');
            expect(res.body.user).to.have.property('pseudo').equal('testuser');
            expect(res.body).to.have.property('token');
            authToken = res.body.token; // Stocke le token pour les tests ultérieurs
            done();
          });
      });
  });

  it('should get a user by ID with authentication', (done) => {
    chai.request(app)
      .get(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email').equal('testuser@supinfo.com');
        expect(res.body).to.have.property('pseudo').equal('testuser');
        done();
      });
  });

  it('should update a user by ID with authentication', (done) => {
    chai.request(app)
      .put(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
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

  it('should delete a user by ID with authentication', (done) => {
    chai.request(app)
      .delete(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User deleted successfully');
        done();
      });
  });
});