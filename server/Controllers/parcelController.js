import query from '../Data/parcelData';

const parcel = {

delete(req, res){

let sql = `DELETE FROM parcels WHERE id = $1`;
let data = [req.params.id];

if (!req,body.userId){
   return res.status(400).send({message:'enter your userId to proceed'});
}

let sql2 = `SELECT * FROM parcels WHERE id = $1`;

try{

  let { rows } = await query(sql2, data);

  if(!rows[0]){
    return res.status(400).send({message:'this parcel od not exist'});
  }

  if(rows[0].userid !== req.body.userId){
    return res.status(400).send({message:'the specified user did not create this parcel'})
  }
  
   await query(sql, data);
   
   return res.status(201).send({message : 'parcel DELETED'});

}
catch(error){
  return res.status(400).send(error.message);
}

}

};

export default parcel;