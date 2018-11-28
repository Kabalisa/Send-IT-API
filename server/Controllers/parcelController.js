import query from '../Data/parcelData';

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

  if(!req.body.pickup_StNo || !req.body.pickup || !req.body.destination_StNo || !req.body.destination || !req.body.weight || !req.body.userId || !req.body.receiver || !req.body.receiver_phone){
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
  
}
  
   

};

export default parcel;