const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Booking API', () => {
  let createdBookingId; // Stocker id

  it('should create a new booking', (done) => {
    chai.request(app)
      .post('/bookings')
      .send({
        user: 'userId', // à remplacer par id de user dans railddb
        train: 'trainId', // à remplacer par id de train dans railddb
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

  it('should get a booking by ID', (done) => {
    chai.request(app)
      .get(`/bookings/${createdBookingId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('train');
        expect(res.body).to.have.property('date');
        done();
      });
  });

  it('should update a booking by ID', (done) => {
    chai.request(app)
      .put(`/bookings/${createdBookingId}`)
      .send({
        // Les données de mise à jour de la réservation
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('train');
        expect(res.body).to.have.property('date');
        done();
      });
  });

  it('should delete a booking by ID', (done) => {
    chai.request(app)
      .delete(`/bookings/${createdBookingId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Booking deleted successfully');
        done();
      });
  });
});