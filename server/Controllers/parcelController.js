import query from '../Data/parcelData';

const parcel = {

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

}

};

export default parcel;