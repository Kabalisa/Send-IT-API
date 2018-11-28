import query from '../Data/parcelData';

const parcel = {

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

}

};

export default parcel;