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

//test the GET one parcel endpoint
it('should FETCH one specific parcel', (done) => {
  chai.request(app)
  .get('/api/v1/parcels/1')
  .end((err, res) => {
   res.should.have.status(200);
   res.body.should.be.a('object');
   res.body.should.have.property('id').eql('1');
   res.body.should.have.property('weight').eql('4 kg');
   res.body.should.have.property('price').eql('4000');
   res.body.should.have.property('pickup').eql('nyamirambo');
   res.body.should.have.property('pickup_StNo').eql('KN 245 St');
   res.body.should.have.property('destination').eql('remera');
   res.body.should.have.property('destination_StNo').eql('KN 478 St');
   res.body.should.have.property('userId').eql('980768');
   res.body.should.have.property('receiver').eql('mucyo');
   res.body.should.have.property('receiver_phone').eql('0788465633');
   res.body.should.have.property('status').eql('pending');
   res.body.should.have.property('presentLocation').eql('kinamba');
   done();
  });
});

//test when not to fetch a single parcel
it('should not FETCH one specific parcel', (done) => {
  chai.request(app)
  .get('/api/v1/parcels/8999')
  .end((err, res) => {
     res.should.have.status(404);
     res.body.should.be.a('object');
     res.body.should.have.property('message').eql('parcel do not exist');
     done();
  });
});

});