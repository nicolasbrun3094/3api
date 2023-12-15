const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const fs = require('fs');

chai.use(chaiHttp);

describe('Station API', () => {
  let createdStationId;
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

  it('should create a new station with authentication', (done) => {
    const imageBuffer = fs.readFileSync('./stationtest.jpg');
    const imageBase64 = imageBuffer.toString('base64');
    chai.request(app)
      .post('/api/stations')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Gare de Test',
        open_hour: '08:00',
        close_hour: '18:00',
        image: imageBase64,
      })
.end((err, res) => {
        expect(res).to.have.status(201);
        createdStationId = res.body._id;
        done();
      });
  });

  it('should get a station by ID', (done) => {
    chai.request(app)
      .get(`/api/stations/${createdStationId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('open_hour');
        expect(res.body).to.have.property('close_hour');
        expect(res.body).to.have.property('image');
        done();
      });
  });
  it('should update a station by ID with authentication', (done) => {
    chai.request(app)
      .put(`/api/stations/${createdStationId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .send({
        name: 'Gare de Test Modifiée',
        open_hour: '09:00',
        close_hour: '19:00',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').equal('Gare de Test Modifiée');
        expect(res.body).to.have.property('open_hour').equal('09:00');
        expect(res.body).to.have.property('close_hour').equal('19:00');
        done();
      });
  });

  it('should delete a station by ID with authentication', (done) => {
    chai.request(app)
      .delete(`/api/stations/${createdStationId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Station deleted successfully');
        done();
      });
  });
});
