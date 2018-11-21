import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();
chai.use(chaiHttp);

/* Test the /GET route */
describe('app route to GET index page', () => {
  it('it should GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it('it should handle 404 error', (done) => {
    chai.request(app)
      .get('/notExist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('app routes to make http request', () => {
//tests the GET all parcels endpoint
it('should FETCH all parcels', (done) => {
  chai.request(app)
  .get('/api/v1/parcels')
  .end((err,res) => {
    res.should.have.status(200);
    done();
  });
});

});