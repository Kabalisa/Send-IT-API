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
   res.body.should.have.property('weight').eql('4');
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

//test the cancel specific order endpoint
it('should cancel a specified parcel delivery order', (done) => {
  chai.request(app)
  .put('/api/v1/parcels/2/cancel')
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status').eql('canceled');
    done();
  });
});

//test when not to cancel a specified parcel
it('should not cancel a parcel', (done) => {
  chai.request(app)
  .put('/api/v1/parcels/33/cancel')
  .end((err, res) => {
    res.should.have.status(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('parcel do not exist');
    done();
  });
});

//test the FETCH parcels for one user endpoint
it('should FETCH  all parcels for one user', (done) => {
   chai.request(app)
   .get('/api/v1/users/657384/parcels')
   .end((err, res) => {
     res.should.have.status(200);
     res.body.should.be.a('array');
     res.body.length.should.be.eql(1);
     done();
   });
});

//test when not to fethc parcels for one user
it('should not fetch all parcels for one user', (done) => {
  chai.request(app)
  .get('/api/v1/users/6573/parcels')
  .end((err, res) => {
   res.should.have.status(404);
   res.body.should.be.a('object');
   res.body.should.have.property('message').eql('user has no parcels');
   done();
  });
});

//test the create parcel endpoint
it('should create a parcel delivery order', (done) =>{
    const item = {
       pickup_StNo : 'KN 334 St',      
       pickup : 'kirehe',
       destination_StNo : 'KN 322 St',
       destination : 'bugesera',
       weight : '5',
       userId : '222000',
       receiver : 'peruth',
       receiver_phone : '0789765432'
    };
    chai.request(app)
    .post('/api/v1/parcels')
    .send(item)
    .end((err,res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('weight').eql('5');
      res.body.should.have.property('price').eql(5000);
      res.body.should.have.property('pickup').eql('kirehe');
      res.body.should.have.property('pickup_StNo').eql('KN 334 St');
      res.body.should.have.property('destination').eql('bugesera');
      res.body.should.have.property('destination_StNo').eql('KN 322 St');
      res.body.should.have.property('userId');
      res.body.should.have.property('receiver').eql('peruth');
      res.body.should.have.property('receiver_phone').eql('0789765432');
      res.body.should.have.property('status').eql('pending');
      res.body.should.have.property('presentLocation').eql('kirehe');
      done();
    });
});

//test a created follows proper datatypes parcel endpoint
it('should create a parcel delivery order with proper datatypes', (done) =>{
    const item = {
       pickup_StNo : 'KN 334 St',      
       pickup : '1234',
       destination_StNo : 'KN 322 St',
       destination : 'bugesera',
       weight : '5',
       userId : '222000',
       receiver : 'peruth',
       receiver_phone : '0789765432'
    };
    chai.request(app)
    .post('/api/v1/parcels')
    .send(item)
    .end((err,res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('CHECK: pickup location, destination location and receiver must be a word')
      done();
    });
});

//test a created follows proper datatypes parcel endpoint
it('should create a parcel delivery order with proper datatypes', (done) =>{
    const item = {
       pickup_StNo : 'KN 334 St',      
       pickup : 'remera',
       destination_StNo : 'KN 322 St',
       destination : 'bugesera',
       weight : '5',
       userId : 'string',
       receiver : 'peruth',
       receiver_phone : '0789765432'
    };
    chai.request(app)
    .post('/api/v1/parcels')
    .send(item)
    .end((err,res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('CHECK: weight, userId and receiver_phone must be a number')
      done();
    });
});

//test when not to create parcel
it('should not create a parcel delivery order', (done) => {
  const item = {
    weight : '5',
    userId : '222000'
  };
  chai.request(app)
  .post('/api/v1/parcels')
  .send(item)
  .end((err, res) => {
   res.should.have.status(400);
   res.should.be.a('object');
   res.body.should.have.property('message').eql('complete all fields to proceed');
   done();
  });
});

//test the delete specific parcel order endpoint
it('should delete a specified parcel delivery order', (done) => {
  chai.request(app)
  .delete('/api/v1/parcels/2/delete')
  .end((err, res) => {
    res.should.have.status(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('parcel DELETED');
    done();
  });
});

//test when not to delete a specific parcel 
it('should not delete a parcel', (done) => {
  chai.request(app)
  .delete('/api/v1/parcels/7/delete')
  .end((err, res) => {
     res.should.have.status(404);
     res.body.should.be.a('object');
     res.body.should.have.property('message').eql('parcel do not exist');
     done();
  });
});

//test when to update a specific parcel
it('should update a specific parcel delivery order', (done) => {
  const item = {
       pickup_StNo : 'KN 332 St',
       pickup : 'kayonza',
       destination_StNo : 'KN 003 St',
       destination : 'kigali',
       weight : '50',
       receiver : 'krichof',
       receiver_phone : '0788364536'
    };
chai.request(app)
.put('/api/v1/parcels/1/update')
.send(item)
.end((err, res) => {
  res.should.have.status(200);
  res.body.should.be.a('object');
  res.body.should.have.property('id').eql('1');
  res.body.should.have.property('weight').eql('50');
  res.body.should.have.property('price').eql(50000);
  res.body.should.have.property('pickup_StNo').eql('KN 332 St');
  res.body.should.have.property('pickup').eql('kayonza');
  res.body.should.have.property('destination_StNo').eql('KN 003 St');
  res.body.should.have.property('destination').eql('kigali');
  res.body.should.have.property('userId').eql('980768');
  res.body.should.have.property('status').eql('pending');
  res.body.should.have.property('receiver').eql('krichof');
  res.body.should.have.property('receiver_phone').eql('0788364536');
  res.body.should.have.property('presentLocation').eql('kayonza');
  done();
});
});

// test whe not to update a parcel delivery order
it('should not update a parcel', (done) => {
chai.request(app)
.put('/api/v1/parcels/778/update')
.end((err, res) => {
res.should.have.status(404);
res.body.should.be.a('object');
res.body.should.have.property('message').eql('parcel do not exist');
done();
});
});

//test when to update a specific parcel
it('should update a specific parcel delivery order', (done) => {
  const item = {
       pickup_StNo : '',
       pickup : '',
       destination_StNo : '',
       destination : '',
       weight : '',
       receiver : '',
       receiver_phone :''
    };
chai.request(app)
.put('/api/v1/parcels/1/update')
.send(item)
.end((err, res) => {
  res.should.have.status(404);
  res.body.should.be.a('object');
  res.body.should.have.property('message').eql('nothing updated');
  done();
});
});

});