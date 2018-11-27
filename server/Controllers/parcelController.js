import query from '../Data/parcelData';

const parcel = {

signup(req, res){

  let sql = `
    INSERT INTO users()
  `;

  if(!req.body.pickup_StNo || !req.body.pickup || !req.body.destination_StNo || !req.body.destination || !req.body.weight || !req.body.userId || !req.body.receiver || !req.body.receiver_phone){
  	return res.status(400).send({message: 'complete all fields to proceed'});
  }
  if(req.body.pickup.toLowerCase() === req.body.pickup.toUpperCase() || req.body.destination.toLowerCase() === req.body.destination.toUpperCase() || req.body.receiver.toLowerCase() === req.body.receiver.toUpperCase()){
    return res.status(400).send({message: 'CHECK: pickup location, destination location and receiver must be a word'});
  }

  if(req.body.weight.toLowerCase() !== req.body.weight.toUpperCase() || req.body.userId.toLowerCase() !== req.body.userId.toUpperCase() || req.body.receiver_phone.toLowerCase() !== req.body.receiver_phone.toUpperCase()){
    return res.status(400).send({message: 'CHECK: weight, userId and receiver_phone must be a number'});
  }

  const parcel = parcelData.create(req.body);
  return res.status(201).send(parcel);
},

};

export default parcel;