import query from '../Data/parcelData';

const parcel = {

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

}

};

export default parcel;
