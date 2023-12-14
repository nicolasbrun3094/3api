const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Station API', () => {
  let createdStationId; 

  it('should create a new station', (done) => {
    chai.request(app)
      .post('/api/stations')
      .send({
        name: 'Gare de Test',
        open_hour: '08:00',
        close_hour: '18:00',
        image: "gare_test.jpg"
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('open_hour');
        expect(res.body).to.have.property('close_hour');
        createdStationId = res.body._id;
        done();
      });
  });

  it('should get a station by ID', (done) => {
    chai.request(app)
      .get(`/api/stations/${createdStationId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('open_hour');
        expect(res.body).to.have.property('close_hour');
        done();
      });
  });

  it('should update a station by ID', (done) => {
    chai.request(app)
      .put(`/api/stations/${createdStationId}`)
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

  it('should delete a station by ID', (done) => {
    chai.request(app)
      .delete(`/api/stations/${createdStationId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Station deleted successfully');
        done();
      });
  });
});