import query from '../Data/parcelData';
import bhelp from '../helpers/bhelp';

const parcel = {

async destination(req, res){

let sql = `SELECT * FROM parcels WHERE id = $1`;
let data = [req.params.id];

if(!req.body.userId || !req.body.destination){
  return res.status(404).send({message:'all fields are required in order to proceed!!'});	
}

try{

  let { rows } = await query(sql, data);
  
  if(!rows[0]){
    return res.status(400).send({message: 'the specified parcel do not exist'});
  }
  else if(rows[0].userid !== Number.parseInt(req.body.userId)){
    return res.status(400).send({message: 'the specified user did not create the specified parcel!!'});
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

}

};

export default parcel;