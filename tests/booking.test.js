const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;


chai.use(chaiHttp);

describe('Booking API', () => {
  let createdBookingId; // Stocker id

  it('should create a new booking', (done) => {
    chai.request(app)
      .post('/api/bookings')
      .send({
        user: '657af64e8f3bed2a5bee2e55', // à remplacer par id de user dans railddb
        train: '657aede4dfb77320fecd2cd2', // à remplacer par id de train dans railddb
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

  it('should get a booking by ID', (done) => {
    chai.request(app)
      .get(`/api/bookings/${createdBookingId}`)
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
      .put(`/api/bookings/${createdBookingId}`)
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
      .delete(`/api/bookings/${createdBookingId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Booking deleted successfully');
        done();
      });
  });
});