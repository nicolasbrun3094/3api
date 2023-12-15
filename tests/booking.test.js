const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Booking API', () => {
  let createdBookingId;
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

  it('should create a new booking with authentication', (done) => {
    chai.request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        userId: '657b2b177075927bce7d7f11', // Remplace par l'id de l'utilisateur dans railddb
        trainId: '657aede4dfb77320fecd2cd2', // Remplace par l'id du train dans railddb
        date: new Date("2024-01-01T12:00:00.000Z"),
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('train');
        expect(res.body).to.have.property('date');
        createdBookingId = res.body._id; // Stocke l'ID de la réservation créée pour les tests ultérieurs
        done();
      });
  });

  it('should get a booking by ID with authentication', (done) => {
    chai.request(app)
      .get(`/api/bookings/${createdBookingId}`)
      .set('Authorization', `Bearer ${authToken}`)  // Ajoute le token d'authentification à l'en-tête
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('train');
        expect(res.body).to.have.property('date');
        done();
      });
  });

  it('should update a booking by ID with authentication', (done) => {
    chai.request(app)
      .put(`/api/bookings/${createdBookingId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        date: new Date("2024-01-02T14:00:00.000Z"), // Ajoutez les données de mise à jour de la réservation
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Booking updated successfully'); // Accédez à la propriété message directement
        done();
      });
  });

  it('should delete a booking by ID with authentication', (done) => {
    chai.request(app)
      .delete(`/api/bookings/${createdBookingId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Booking deleted successfully');
        done();
      });
  });
});