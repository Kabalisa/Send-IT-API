import query from '../Data/parcelData';
import bhelp from '../helpers/bhelp';

const parcel = {

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

if(!req.body.admincode || !req.body.presentLocation){
  return res.status(404).send({message:'complete all fields to proceed'});  
}

try{

  let { rows } = await query(sql, data);
  if(req.body.admincode !== "meonly"){
     return res.status(400).send({message:'admincode incorrect!!'});
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

}

};

export default parcel;