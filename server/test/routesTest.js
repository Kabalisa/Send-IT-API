process.env.ROLE = 'test'

import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import parcelData from '../Data/parcelData';
import query from '../Data/parcelData';
// import 'babel-polyfill';

chai.should();
chai.use(chaiHttp);
let parcelId;
let notParcelId;
let desParcelId;


/* Test the /GET route */
describe('app route  GET index page', () => {
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

describe('app routes for users', () => {

   let user;

  before((done) => {
    let sql = `DELETE FROM users`;
    chai.request(app);
    query(sql);

     const admin = {
      first_name: 'fiston',
      last_name: 'kabalisa',
      town: 'kigali',
      street_number: 'KN 268 St',
      phone_number: '0785382213',
      email: 'ikabalisa20@gmail.com',
      userid: '0',
      password: 'password'
    };

    chai.request(app)
    .post('/auth/signup')
    .send(admin)
    .end((err, res) => {
      user = res.body.result.userid;
      done();
    });

  });
  
  it('should create a users account', (done) => {
    const user = {
      first_name: 'bubble',
      last_name: 'bee',
      town: 'dreams',
      street_number: 'KN 100 St',
      phone_number: '0788654334',
      email: 'bubblebee@gmail.com',
      userid: '101010',
      password: 'fiston'
    };

     chai.request(app)
     .post('/auth/signup')
     .send(user)
     .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('token');
      res.body.result.should.have.property('first_name').eql('bubble');
      res.body.result.should.have.property('last_name').eql('bee');
      res.body.result.should.have.property('town').eql('dreams');
      res.body.result.should.have.property('street_number').eql('KN 100 St');
      res.body.result.should.have.property('phone_number').eql(788654334);
      res.body.result.should.have.property('email').eql('bubblebee@gmail.com');
      res.body.result.should.have.property('userid').eql(101010);
      done();
     });

  });

  // test when not to create a user account 
  it('should not create a user account', (done) => {
    let user = {
      first_name : 'bubble',
      password : 'fiston'
    };

    chai.request(app)
    .post('/auth/signup')
    .send(user)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('complete all fields to proceed');
      done();
    });
  });

  // test when not to create a user account
  it('should not create a users account', (done) => {
    const user = {
      first_name: '1222',
      last_name: 'bee',
      town: 'dreams',
      street_number: 'KN 100 St',
      phone_number: '0788654334',
      email: 'bubblebee@gmail.com',
      userid: '101010',
      password: 'fiston'
    };

     chai.request(app)
     .post('/auth/signup')
     .send(user)
     .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('CHECK: first_name, last_name, town, and email must be a word');
      done();
     });

  });

  //test when not create a user account
  it('should again not create a users account', (done) => {
    const user = {
      first_name: 'bubble',
      last_name: 'bee',
      town: 'dreams',
      street_number: 'KN 100 St',
      phone_number: 'nta phone mfite',
      email: 'bubblebee@gmail.com',
      userid: '101010',
      password: 'fiston'
    };

     chai.request(app)
     .post('/auth/signup')
     .send(user)
     .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('CHECK: phone_number and userid must be a number');
      done();
     });

  });


  it('should login the user', (done) => {
    const credentials = {
      userid: '101010',
      password: 'fiston'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('token');
      done();
    });
  });

  //test when not to sign in a user
  it('should again not login a user', (done) => {
    let credentials = {
      userid : '101010'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('complete all field to proceed');
      done();
    });
  });

  //test when not to sign in a user
  it('should also again not login a user', (done) => {
    let credentials = {
      userid : '101020',
      password :'fiston'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user does not exist');
      done();
    });
  });

  //test when not to sign in a user
  it('should not login a user', (done) => {
    let credentials = {
      userid : '101010',
      password : 'innocent'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('INVALID password');
      done();
    });
  });

});

describe('create another user and parcel', () => {
  let another_token;
  let user;

  before((done) => {
    let otherUser = {
      first_name: 'ineza',
      last_name: 'digne',
      town: 'ruyenzi',
      street_number: 'KN 400 St',
      phone_number: '0788475785',
      email: 'inezadigne@gmail.com',
      userid: '100100',
      password: 'password'
    };

    chai.request(app)
    .post('/auth/signup')
    .send(otherUser)
    .end((err,res) => {
      user = res.body.result.userid;;
      done();
    });
  });

  it('login the other user', (done) => {
     const credentials = {
      userid: '100100',
      password: 'password'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
        another_token = res.body.token;
        res.should.have.status(200);
       res.body.should.be.a('object');
      done();
    });
  });

  it('should create a parcel from another user', (done) => {
    let parcel = {
       weight : '8',
       pickup : 'ruyenzi',
       pickup_StNo : 'KN 400 St',
       destination : 'kigali',      
       destination_StNo : 'KN 278 St',
       receiver : 'brianna',
       receiver_phone : '0783788842'
    };

    chai.request(app)
    .post('/api/v1/parcels')
    .set('x-access-token', another_token)
    .send(parcel)
    .end((err, res) => {
      desParcelId = res.body.id;
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });

  });

});

describe('app routes for parcels', () => {

   let user_token;

  before((done) => {
    const credentials = {
      userid: '101010',
      password: 'fiston'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
        user_token = res.body.token;
      done();
    });
  });

  //test the create parcel endpoint
it('should create a parcel delivery order', (done) =>{
    const item = {
       weight : '5',
       pickup : 'kirehe',
       pickup_StNo : 'KN 334 St',
       destination : 'bugesera',      
       destination_StNo : 'KN 322 St',
       receiver : 'peruth',
       receiver_phone : '0789765432'
    };
    chai.request(app)
    .post('/api/v1/parcels')
    .set('x-access-token', user_token)
    .send(item)
    .end((err,res) => {
      parcelId = res.body.id;
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('weight').eql(5);
      res.body.should.have.property('price').eql(5000);
      res.body.should.have.property('pickup').eql('kirehe');
      res.body.should.have.property('pickup_stno').eql('KN 334 St');
      res.body.should.have.property('destination').eql('bugesera');
      res.body.should.have.property('destination_stno').eql('KN 322 St');
      res.body.should.have.property('userid');
      res.body.should.have.property('receiver').eql('peruth');
      res.body.should.have.property('receiver_phone').eql(789765432);
      res.body.should.have.property('status').eql('pending');
      res.body.should.have.property('presentlocation').eql('kirehe');
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
       receiver : 'peruth',
       receiver_phone : '0789765432'
    };
    chai.request(app)
    .post('/api/v1/parcels')
    .set('x-access-token', user_token)
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
       weight : 'string',
       receiver : 'peruth',
       receiver_phone : '0789765432'
    };
    chai.request(app)
    .post('/api/v1/parcels')
    .set('x-access-token', user_token)
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
  .set('x-access-token', user_token)
  .send(item)
  .end((err, res) => {
   res.should.have.status(400);
   res.should.be.a('object');
   res.body.should.have.property('message').eql('complete all fields to proceed');
   done();
  });
});

//test the GET one parcel endpoint
it('should FETCH one specific parcel', (done) => {
  chai.request(app)
  .get(`/api/v1/parcels/${parcelId}`)
  .set('x-access-token', user_token)
  .end((err, res) => {
   res.should.have.status(200);
   res.body.should.be.a('object');
   res.body.should.have.property('id');
   res.body.should.have.property('weight').eql(5);
   res.body.should.have.property('price').eql(5000);
   res.body.should.have.property('pickup').eql('kirehe');
   res.body.should.have.property('pickup_stno').eql('KN 334 St');
   res.body.should.have.property('destination').eql('bugesera');
   res.body.should.have.property('destination_stno').eql('KN 322 St');
   res.body.should.have.property('userid').eql(101010);
   res.body.should.have.property('receiver').eql('peruth');
   res.body.should.have.property('receiver_phone').eql(789765432);
   res.body.should.have.property('status').eql('pending');
   res.body.should.have.property('presentlocation').eql('kirehe');
   done();
  });
});

notParcelId = parcelId + 1;

//test when not to fetch a single parcel
it('should not FETCH one specific parcel', (done) => {
  chai.request(app)
  .get('/api/v1/parcels/0')
  .set('x-access-token', user_token)
  .end((err, res) => {
     res.should.have.status(400);
     res.body.should.be.a('object');
     res.body.should.have.property('message').eql('parcel do not exist');
     done();
  });
});

//test when not to fetch a single parcel
it('a user should not fetch a parcel she did not create', (done) => {
  chai.request(app)
  .get(`/api/v1/parcels/${desParcelId}`)
  .set('x-access-token', user_token)
  .end((err, res) => {
     res.should.have.status(400);
     res.body.should.be.a('object');
     res.body.should.have.property('message').eql('you do not have a parcel with the specified id in the URL');
     done();
  });
});

//test the cancel specific order endpoint
it('should cancel a specified parcel delivery order', (done) => {
  chai.request(app)
  .put(`/api/v1/parcels/${parcelId}/cancel`)
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status').eql('CANCELED');
    done();
  });
});

//test when not to cancel a specified parcel
it('should not cancel a parcel', (done) => {
  chai.request(app)
  .put('/api/v1/parcels/0/cancel')
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('the parcel does not exist');
    done();
  });
});

//test when not to cancel a parcel delivery order
it('user should not cancel a parcel she did not create', (done) => {
  chai.request(app)
  .put(`/api/v1/parcels/${desParcelId}/cancel`)
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('you do not have a parcel with the specified id in the URL');
    done();
  });
});

//test the FETCH parcels for one user endpoint
it('should FETCH  all parcels for one user', (done) => {
   chai.request(app)
   .get('/api/v1/users/101010/parcels')
   .set('x-access-token', user_token)
   .end((err, res) => {
     res.should.have.status(200);
     res.body.should.be.a('object');
     res.body.should.have.property('rows');
     res.body.should.have.property('rowCount');
     done();
   });
});

//test when not to fethc parcels for one user
it('should not fetch all parcels for one user', (done) => {
  chai.request(app)
  .get('/api/v1/users/6573/parcels')
  .set('x-access-token', user_token)
  .end((err, res) => {
   res.should.have.status(400);
   res.body.should.be.a('object');
   res.body.should.have.property('message').eql('the specified userid in the URL is not the one logged in');
   done();
  });
});

// test the user update destination endpoint
  it('user should update destination of a parcel delivery order', (done) => {

    let destination = {
    destination : 'nyamata'
    };

  chai.request(app)
  .put(`/api/v1/parcels/${parcelId}/destination`)
  .send(destination)
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('destination').eql('nyamata');
    done();
  });
});

  // test when not ot update the destination of a parcel delivery order
  it('should not update the destination of a parcel delivery', (done) => {
    chai.request(app)
    .put(`/api/v1/parcels/${parcelId}/destination`)
    .set('x-access-token', user_token)
    .end((err,res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('complete the destination field to proceed!!');
      done();
    });
  });

  // test when the user do not update destination endpoint
  it('user should not update destination of a parcel delivery order', (done) => {

    let destination = {
    destination : 'nyamata'
    };

  chai.request(app)
  .put('/api/v1/parcels/0/destination')
  .send(destination)
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('the specified parcel do not exist');
    done();
  });
});

  //test when not to update the destination of a parcel delivery order
  it('user should not update the destination of a parcel she did not create', (done) =>{
    let destination = {
    destination : 'nyamata'
    };

  chai.request(app)
  .put(`/api/v1/parcels/${desParcelId}/destination`)
  .send(destination)
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('the specified user did not create this parcel');
    done();
   });
  });

  //test when to update a specific parcel
it('should update a specific parcel delivery order', (done) => {
  const newitem = {
       weight : '50',
       destination : 'kimironko',
       receiver : 'krichof',
       receiver_phone : '0788364536'
    };
chai.request(app)
.put(`/api/v1/parcels/${parcelId}/update`)
.set('x-access-token', user_token)
.send(newitem)
.end((err, res) => {
  res.should.have.status(200);
  res.body.should.be.a('object');
  res.body.should.have.property('id');
  res.body.should.have.property('weight').eql(50);
  res.body.should.have.property('price').eql(50000);
  res.body.should.have.property('pickup_stno').eql('KN 334 St');
  res.body.should.have.property('pickup').eql('kirehe');
  res.body.should.have.property('destination_stno').eql('KN 322 St');
  res.body.should.have.property('destination').eql('kimironko');
  res.body.should.have.property('userid').eql(101010);
  res.body.should.have.property('status').eql('CANCELED');
  res.body.should.have.property('receiver').eql('krichof');
  res.body.should.have.property('receiver_phone').eql(788364536);
  res.body.should.have.property('presentlocation').eql('kirehe');
  done();
});
});

// test when not to update a parcel delivery order
it('should not update a parcel', (done) => {
chai.request(app)
.put('/api/v1/parcels/0/update')
.set('x-access-token', user_token)
.end((err, res) => {
res.should.have.status(400);
res.body.should.be.a('object');
res.body.should.have.property('message').eql('this parcel does not exist');
done();
});
});

// tes when not to update a parcel delivery order
it('user should not update a parcel delivery order she did not create', (done) => {
  const newitem = {
       weight : '50',
       destination : 'kimironko',
       receiver : 'krichof',
       receiver_phone : '0788364536'
    };
chai.request(app)
.put(`/api/v1/parcels/${desParcelId}/update`)
.set('x-access-token', user_token)
.send(newitem)
.end((err, res) => {
  res.should.have.status(400);
  res.body.should.be.a('object');
  res.body.should.have.property('message').eql('you do not have a parcel with the specified id in the URL');
  done();
});
});

//test when to update a specific user
it('should update a specific user details', (done) => {
  const details = {
       first_name: 'claude',
       last_name: 'muhoza',
       town: 'heart',
       street_number: 'KN 323 St',
       phone_number: '0788332211',
       email: 'uine@gmai.com',
       password: 'kabalisa'
    };
chai.request(app)
.put('/auth/myprofile/update')
.set('x-access-token', user_token)
.send(details)
.end((err, res) => {
  res.should.have.status(200);
  res.body.should.be.a('object');
  res.body.should.have.property('userid').eql(101010);
  res.body.should.have.property('first_name').eql('claude');
  res.body.should.have.property('last_name').eql('muhoza');
  res.body.should.have.property('town').eql('heart');
  res.body.should.have.property('street_number').eql('KN 323 St');
  res.body.should.have.property('phone_number').eql(788332211);
  res.body.should.have.property('email').eql('uine@gmai.com');
  res.body.should.have.property('password')
  done();
});
});

// tests when not to fetch all parcels
it('should not fetch all parcels', (done) => {
  chai.request(app)
  .get('/api/v1/parcels')
  .set('x-access-token', user_token)
  .end((err,res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user not admin');
      done();
  });
});

// test when not to fetch all users 
it('should not fetch all users', (done) => {
     chai.request(app)
     .get('/auth/list/users')
     .set('x-access-token', user_token)
     .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user not admin');
      done();
     });
});

//test when not to update the presentlocation endpoint
it('should not update the presentLocation of a parcel delivery order', (done) => {
  let presentLocation  = {
     presentLocation : 'nyakariro'
  };

  chai.request(app)
  .put(`/api/v1/parcels/${parcelId}/presentLocation`)
  .set('x-access-token',user_token)
  .send(presentLocation)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('user not admin');
    done();
  });
});

//test when not to update the status of a parcel delivery order
it('should not update the status a parcel delivery order', (done) => {
  let status = {
    status : 'pending'
  };

  chai.request(app)
  .put(`/api/v1/parcels/${parcelId}/status`)
  .set('x-access-token', user_token)
  .send(status)
  .end((err,res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user not admin');
      done();
  });
});

});

describe('admin access only', () => {
 
  let admin_token;

  before((done) => {

    const credentials = {
      userid: '0',
      password: 'password'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
        admin_token = res.body.token;
      done();
    });

  });

  //tests the GET all parcels endpoint
  it('should FETCH all parcels', (done) => {
  chai.request(app)
  .get('/api/v1/parcels')
  .set('x-access-token', admin_token)
  .end((err,res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('rows');
    res.body.should.have.property('rowCount');
    done();
  });
});

  //tests the GET all users endpoint
  it('should FETCH all users', (done) => {
  chai.request(app)
  .get('/auth/list/users')
  .set('x-access-token', admin_token)
  .end((err,res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('rows');
    res.body.should.have.property('rowCount');
    done();
  });
});

  // test the update presentlocation endpoint
  it('should update presentLocation of a parcel delivery order', (done) => {

    let presentLocation = {
    presentLocation : 'nyakariro'
    };

  chai.request(app)
  .put(`/api/v1/parcels/${parcelId}/presentLocation`)
  .send(presentLocation)
  .set('x-access-token', admin_token)
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('presentlocation').eql('nyakariro');
    done();
  });
});

  // test when not to update presentlocation endpoint
  it('should not update presentLocation of a parcel delivery order', (done) => {

    let presentLocation = {
    presentLocation : 'nyakariro'
    };

  chai.request(app)
  .put('/api/v1/parcels/0/presentLocation')
  .send(presentLocation)
  .set('x-access-token', admin_token)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('the parcel does not exist');
    done();
  });
});

  // test when not to update the presentlocation endpoint
  it('should not update the presentlocation of a parcel delivery order', (done) => {
     chai.request(app)
     .put(`/api/v1/parcels/${parcelId}/presentLocation`)
     .set('x-access-token', admin_token)
     .end((err,res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('complete the presentLocation fields to proceed');
      done();
     });
  });

  // test the update status endpoint
  it('should update status of a parcel delivery order', (done) => {

    let status = {
    status : 'delivered'
    };

  chai.request(app)
  .put(`/api/v1/parcels/${parcelId}/status`)
  .send(status)
  .set('x-access-token', admin_token)
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('status').eql('delivered');
    done();
  });
});

  // test when not to update the parcels delivery order's status
  it('should not update the status of the parcel deivery order', (done) => {
    chai.request(app)
    .put(`/api/v1/parcels/${parcelId}/status`)
    .set('x-access-token', admin_token)
    .end((err,res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('complete the status fields to proceed');
      done();
    });
  });

  // test when not to update status endpoint
  it('should not update status of a parcel delivery order', (done) => {

    let status = {
    status : 'delivered'
    };

  chai.request(app)
  .put('/api/v1/parcels/0/status')
  .send(status)
  .set('x-access-token', admin_token)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('the parcel does not exist');
    done();
  });
});

});

describe('delete a parcel or a user', () => {

  let user_token;

  before((done) => {
    const credentials = {
      userid: '101010',
      password: 'kabalisa'
    };

    chai.request(app)
    .post('/auth/signin')
    .send(credentials)
    .end((err, res) => {
        user_token = res.body.token;
      done();
    });
  });

  //test the delete specific parcel order endpoint
  it('should delete a specified parcel delivery order', (done) => {
  chai.request(app)
  .delete(`/api/v1/parcels/${parcelId}/delete`)
  .set('x-access-token', user_token)
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
  .delete('/api/v1/parcels/0/delete')
  .set('x-access-token', user_token)
  .end((err, res) => {
     res.should.have.status(400);
     res.body.should.be.a('object');
     res.body.should.have.property('message').eql('this parcel does not exist');
     done();
  });
});

// test when not to delete a parcel delivery order
it('user should not delete a parcel she did not create', (done) => {
  chai.request(app)
  .delete(`/api/v1/parcels/${desParcelId}/delete`)
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('you do not have a parcel with the specified id in the URL');
    done();
  });
});

  //test when not to fethc parcels for one user
it('should not fetch all parcels for one user', (done) => {
  chai.request(app)
  .get('/api/v1/users/101010/parcels')
  .set('x-access-token', user_token)
  .end((err, res) => {
   res.should.have.status(400);
   res.body.should.be.a('object');
   res.body.should.have.property('message').eql('user has no parcels');
   done();
  });
});

  //test the delete specific user account endpoint
  it('should delete a specified user account', (done) => {
  chai.request(app)
  .delete('/auth/myprofile/delete')
  .set('x-access-token', user_token)
  .end((err, res) => {
    res.should.have.status(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('your account has been deleted');
    done();
  });
});

});