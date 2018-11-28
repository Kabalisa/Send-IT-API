import query from '../Data/parcelData';
import bhelp from '../helpers/bhelp';
import uuid from 'uuid/v4';

const parcel = {

async signup(req, res){

  let sql = `
    INSERT INTO users(id, first_name, last_name, town, street_number, phone_number, email, userid, password, isloggedin)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    returning *
  `;

  let hashPassword = bhelp.hashPassword(req.body.password);

  let data  = [
   uuid(),
   req.body.first_name,
   req.body.last_name,
   req.body.town,
   req.body.street_number,
   req.body.phone_number,
   req.body.email,
   req.body.userid,
   hashPassword,
   true
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