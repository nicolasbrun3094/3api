const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Train API', () => {
  let createdTrainId;
  let authToken; // Pour stocker le token d'authentification

  before((done) => {
    // Log in with a user to get the authentication token
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
        authToken = res.body.token; // Stocke le token pour les tests ultérieurs
        done();
      });
  });

  it('should create a new train with authentication', (done) => {
    chai.request(app)
      .post('/api/trains')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Train de Test',
        start_station: 'Gare de Départ',
        end_station: 'Gare d Arrivée',
        time_of_departure: '2023-12-01T08:00:00Z',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('start_station');
        expect(res.body).to.have.property('end_station');
        expect(res.body).to.have.property('time_of_departure');
        createdTrainId = res.body._id;
        done();
      });
  });

  it('should get a train by ID with authentication', (done) => {
    chai.request(app)
      .get(`/api/trains/${createdTrainId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('start_station');
        expect(res.body).to.have.property('end_station');
        expect(res.body).to.have.property('time_of_departure');
        done();
      });
  });

  it('should update a train by ID with authentication', (done) => {
    chai.request(app)
      .put(`/api/trains/${createdTrainId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .send({
        name: 'Train de Test Modifié',
        start_station: 'Gare Modifiée de Départ',
        end_station: 'Gare Modifiée d\'Arrivée',
        time_of_departure: '2023-12-01T09:00:00Z',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').equal('Train de Test Modifié');
        expect(res.body).to.have.property('start_station').equal('Gare Modifiée de Départ');
        expect(res.body).to.have.property('end_station').equal('Gare Modifiée d\'Arrivée');
        expect(res.body).to.have.property('time_of_departure').equal('2023-12-01T09:00:00.000Z');
        done();
      });
  });

  it('should delete a train by ID with authentication', (done) => {
    chai.request(app)
      .delete(`/api/trains/${createdTrainId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Train deleted successfully');
        done();
      });
  });
});
