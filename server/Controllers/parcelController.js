import query from '../Data/parcelData';

const parcel = {

create(req, res){
  if(!req.body.pickup_StNo || !req.body.pickup || !req.body.destination_StNo || !req.body.destination || !req.body.weight || !req.body.userId || !req.body.receiver || !req.body.receiver_phone){
  	return res.status(400).send({message: 'complete all fields to proceed'});
  }
  const parcel = parcelData.create(req.body);
  return res.status(201).send(parcel);
},

};

export default parcel;