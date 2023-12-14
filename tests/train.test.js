const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Train API', () => {
  let createdTrainId;

  it('should create a new train', (done) => {
    chai.request(app)
      .post('/api/trains')
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

  it('should get a train by ID', (done) => {
    chai.request(app)
      .get(`/api/trains/${createdTrainId}`)
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

  it('should update a train by ID', (done) => {
    chai.request(app)
      .put(`/api/trains/${createdTrainId}`)
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

  it('should delete a train by ID', (done) => {
    chai.request(app)
      .delete(`/api/trains/${createdTrainId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Train deleted successfully');
        done();
      });
  });
});