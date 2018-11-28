import query from '../Data/parcelData';
import bhelp from '../helpers/bhelp';

const parcel = {

async signin(req, res){

let sql = `SELECT * FROM users WHERE userid = $1`;
let data = [req.body.userId];

if(!req.body.userId || !req.body.password){
  return res.status(404).send({message:'complete all field to proceed'});	
}

try{

  const { rows } = await query(sql, data);
  if(!rows[0]){
     return res.status(400).send({message:'user does not exist'});
  }
  
  if(bhelp.validatePassword(req.body.password, rows[0].password)){
    return res.status(400).send({message:'INVALID password'});
  }
  else{
    return res.status(200).send({message: `user with id ${req.body.userId} is logged in`});
  }
}

}

};

export default parcel;