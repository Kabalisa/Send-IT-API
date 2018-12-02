import query from '../Data/parcelData';
import bhelp from '../helpers/bhelp';
import uuid from 'uuid/v4';

const parcel = {

async create(req, res){

  const sql = `
     INSERT INTO parcels(weight, price, pickup, pickup_stNo, destination, destination_stNo, userid, receiver, receiver_phone, status, presentlocation)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     returning *
  `;

  const data = [
     req.body.weight,
     req.body.weight * 1000,
     req.body.pickup,
     req.body.pickup_StNo,
     req.body.destination,
     req.body.destination_StNo,
     req.body.userId,
     req.body.receiver,
     req.body.receiver_phone,
     'pending',
     req.body.pickup
  ];

  if(!req.body.pickup_StNo || !req.body.pickup || !req.body.destination_StNo || !req.body.destination || !req.body.weight || !req.body.receiver || !req.body.receiver_phone){
    return res.status(400).send({message: 'complete all fields to proceed'});
  }

  if(req.body.pickup.toLowerCase() === req.body.pickup.toUpperCase() || req.body.destination.toLowerCase() === req.body.destination.toUpperCase() || req.body.receiver.toLowerCase() === req.body.receiver.toUpperCase()){
    return res.status(400).send({message: 'CHECK: pickup location, destination location and receiver must be a word'});
  }

  if(req.body.weight.toLowerCase() !== req.body.weight.toUpperCase() || req.body.userId.toLowerCase() !== req.body.userId.toUpperCase() || req.body.receiver_phone.toLowerCase() !== req.body.receiver_phone.toUpperCase()){
    return res.status(400).send({message: 'CHECK: weight, userId and receiver_phone must be a number'});
  }
   
  try{
  const { rows } = await query(sql, data);
    return res.status(201).send(rows[0]);
  }
  catch(error){
    return res.status(400).send(error.message);
  }
},

async getAll(req, res){

 let sql = `
 SELECT * FROM parcels
 `; 

 try{
  const { rows, rowCount } = await query(sql);
  return res.status(200).send({ rows, rowCount });
}
  catch(error){
    return res.status(400).send(error.message);
  }
},

async getUsers(req, res){

let sql = `
SELECT * FROM users
`;

try{
const { rows, rowCount } = await query(sql);
return res.status(200).send({ rows, rowCount });
}
catch(error){
  return res.status(400).send(error.message);
}

},

async presentLocation(req, res){

let sql = `
UPDATE parcels
SET presentlocation = $1
WHERE id = $2
returning *
`;

let data = [
req.body.presentLocation,
req.params.id
];

if(!req.body.presentLocation){
  return res.status(404).send({message:'complete the presentLocation fields to proceed'});  
}

try{

  let { rows } = await query(sql, data);

  if(req.body.userId != '0'){
    return res.status(400).send({message: 'user not admin'});
  }

  if(!rows[0]){
    return res.status(400).send({message:'the parcel does not exist'});
  }
  else{
    return res.status(200).send(rows[0]);
  }

}

catch(error){
  return res.status(400).send(error.message);
}

},

async status(req, res){

let sql = `
UPDATE parcels
SET status = $1
WHERE id = $2
returning *
`;

let data = [
req.body.status,
req.params.id
];

if(!req.body.status){
  return res.status(404).send({message:'complete the status fields to proceed'});  
}

try{

  let { rows } = await query(sql, data);

  if(req.body.userId != '0'){
    return res.status(400).send({message: 'user not admin'});
  }

  if(!rows[0]){
    return res.status(400).send({message:'the parcel does not exist'});
  }
  else{
    return res.status(200).send(rows[0]);
  }

}
catch(error){
  return res.status(400).send(error.message);
}

},

async destination(req, res){

let sql = `SELECT * FROM parcels WHERE id = $1`;
let data = [req.params.id];

if(!req.body.destination){
  return res.status(404).send({message:'complete the destination field to proceed!!'}); 
}

try{

  let { rows } = await query(sql, data);
  console.log(typeof(rows[0].userid));

  if(req.body.userId != rows[0].userid){
    return res.status(400).send({message:'the specified user did not create this parcel'});
  }
  
  if(!rows[0]){
    return res.status(400).send({message: 'the specified parcel do not exist'});
  }
  else{
    
    let sql2 = `
    UPDATE parcels
    SET destination = $1
    WHERE id = $2
    returning *
    `;

    let data2 = [
      req.body.destination,
      req.params.id
    ];

    let { rows } = await query(sql2, data2);

    return res.status(200).send(rows[0]);

  }

}
catch(error){
return res.status(400).send(error.message);
}

},

async signup(req, res){

  let sql = `
    INSERT INTO users(userid, first_name, last_name, town, street_number, phone_number, email, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    returning *
  `;

  let hashPassword = bhelp.hashPassword(req.body.password);

  let data  = [
   req.body.userid,
   req.body.first_name,
   req.body.last_name,
   req.body.town,
   req.body.street_number,
   req.body.phone_number,
   req.body.email,
   hashPassword
  ]

  if(!req.body.first_name || !req.body.last_name || !req.body.town || !req.body.street_number || !req.body.phone_number || !req.body.email|| !req.body.userid || !req.body.password){
    return res.status(400).send({message: 'complete all fields to proceed'});
  }
  if(req.body.first_name.toLowerCase() === req.body.first_name.toUpperCase() || req.body.last_name.toLowerCase() === req.body.last_name.toUpperCase() || req.body.town.toLowerCase() === req.body.town.toUpperCase() || req.body.email.toLowerCase() === req.body.email.toUpperCase()){
    return res.status(400).send({message: 'CHECK: first_name, last_name, town,\ and email must be a word'});
  }

  if(req.body.phone_number.toLowerCase() !== req.body.phone_number.toUpperCase() || req.body.userid.toLowerCase() !== req.body.userid.toUpperCase()){
    return res.status(400).send({message: 'CHECK: phone_number and userid must be a number'});
  }

  const token = bhelp.makeToken(req.body.userId);

  try{
    const { rows } = await query(sql, data);
    return res.status(201).send({result: rows[0], token});
  }
  catch(error){
    return res.status(400).send({message:'userId already exist'});
  }
},

async signin(req, res){

let sql = `SELECT * FROM users WHERE userid = $1`;
let data = [req.body.userId];

if(!req.body.userId || !req.body.password){
  return res.status(404).send({message:'complete all field to proceed'}); 
}

const token = bhelp.makeToken(req.body.userId);

try{

  const { rows } = await query(sql, data);
  if(!rows[0]){
     return res.status(400).send({message:'user does not exist'});
  }
  
  if(!bhelp.validatePassword(req.body.password, rows[0].password)){
    return res.status(400).send({message:'INVALID password'});
  }
  else{
    return res.status(200).send({token: token});
  }
}
catch(error){
  return res.status(400).send(error.message);
}

},

async cancelOrder(req, res){

let sql = `
UPDATE parcels
SET status = $1
WHERE id = $2
returning *
`;

let data = [
"CANCELED",
req.params.id
];

let sql2 = `
SELECT * FROM parcels
WHERE id = $1
`;

let data2 = [req.params.id];

if(!req.body.userId){
  return res.status(404).send({message:'complete all fields to proceed'});  
}


let { rows } = await query(sql2, data2);

if(rows[0].userid !== Number.parseInt(req.body.userId)){
     return res.status(400).send({message:'the specified user did not create this parcel'});
  }

try{

  let { rows } = await query(sql, data);
  
  if(!rows[0]){
    return res.status(400).send({message:'the parcel does not exist'});
  }
  else{
    return res.status(200).send(rows[0]);
  }

}

catch(error){
  return res.status(400).send(error.message);
}

},

async delete(req, res){

let sql = `DELETE FROM parcels WHERE id = $1`;
let data = [req.params.id];

if (!req.body.userId){
   return res.status(400).send({message:'enter your userId to proceed'});
}

let sql2 = `SELECT * FROM parcels WHERE id = $1`;

try{

  let { rows } = await query(sql2, data);

  if(!rows[0]){
    return res.status(400).send({message:'this parcel does not exist'});
  }

  if(rows[0].userid !== Number.parseInt(req.body.userId)){
    return res.status(400).send({message:'the specified user did not create this parcel'})
  }
  
   await query(sql, data);
   
   return res.status(201).send({message : 'parcel DELETED'});

}
catch(error){
  return res.status(400).send(error.message);
}

},

async deleteUser(req, res){
   
   let sql = `DELETE FROM users WHERE userid = $1`;
   let data  = [req.body.userId];

   try{
       let { rows } = await query(sql, data);
       return res.status(201).send({message: 'your account has been deleted'});
   }
   catch(error){
    return res.status(400).send(error.message);
   }

},

async getAllUserParcels(req, res){
  
  let sql = `SELECT * FROM parcels WHERE userid = $1`;
  let data = [req.params.id];

  try{

    const { rows } = await query(sql, data);

    if(!rows[0]){
    return res.status(404).send({message: 'user has no parcels'});
  }
  else{
    return res.status(200).send(rows[0]);
  }

  }
  catch(error){
    return res.status(400).send(error.message);
  }

},

async updateOrder(req, res){

let sql = `
UPDATE parcels
SET 
 weight = $1,
 price = $2,
 pickup = $3,
 pickup_stno = $4,
 destination = $5,
 destination_stno = $6,
 userid = $7,
 receiver = $8,
 receiver_phone = $9
WHERE id = $10
returning *
`;

let sql2 = `SELECT * FROM parcels WHERE id = $1`;

let data2 = [req.params.id];

if(!req.body.userId){
  return res.status(404).send({message:'complete the userId field to proceed'});  
}

let { rows } = await query(sql2, data2);

if(!rows[0]){
  return res.status(400).send({message:'this parcel does not exist'});
}

if(rows[0].userid !== Number.parseInt(req.body.userId)){
  return res.status(400).send({message:'the specified user is not the one who created this parcel'});
}
  let data = [
  req.body.weight || rows[0].weight,
  req.body.weight * 1000 || rows[0].price,
  req.body.pickup || rows[0].pickup,
  req.body.pickup_stno || rows[0].pickup_stno,
  req.body.destination || rows[0].destination,
  req.body.destination_stno || rows[0].destination_stno,
  req.body.userId || rows[0].userid,
  req.body.receiver || rows[0].receiver,
  req.body.receiver_phone || rows[0].receiver_phone,
  req.params.id
  ];


try{

  let { rows } = await query(sql, data);

  return res.status(200).send(rows[0]);

}

catch(error){
  return res.status(400).send(error.message);
}

},

async getOne(req, res){

let sql = `
SELECT * FROM parcels WHERE id = $1
`;

try{
  const { rows } = await query(sql, [req.params.id]);
  if(!rows[0]){
    return res.status(404).send({message: 'parcel do not exist'});
  }
  else{
    return res.status(200).send(rows[0]);
  } 
}
catch(error){
  return res.status(400).send(error.message);
}

  }

};

export default parcel;
