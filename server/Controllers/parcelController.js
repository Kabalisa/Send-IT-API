import parcelData from '../Data/parcelData';

const parcel = {

create(req, res){
  if(!req.body.pickup_StNo || !req.body.pickup || !req.body.destination_StNo || !req.body.destination || !req.body.weight || !req.body.userId || !req.body.receiver || !req.body.receiver_phone){
  	return res.status(400).send({message: 'complete all fields to proceed'});
  }
  const parcel = parcelData.create(req.body);
  return res.status(201).send(parcel);
},

getAll(req, res){
const allParcels = parcelData.getAll();
return res.status(200).send(allParcels);
},

getOne(req, res){
const oneParcel = parcelData.getOne(req.params.id);
if(!oneParcel){
	return res.status(404).send({message: 'parcel do not exist'});
}
else{
  return res.status(200).send(oneParcel);
}

},

delete(req, res){
 // const parcel = parcelData.getOne(req.params.id);
const note  = parcelData.delete(req.params.id);
 if (!note){
 	return res.status(404).send({message: 'parcel do not exist'});
 }
   return res.status(201).send({message : 'parcel DELETED'});
},

getAllUserParcels(req, res){
	const parcels = parcelData.getAllUserParcels(req.params.id);
	if(parcels.length === 0){
    return res.status(404).send({message: 'user has no parcels'});
	}
	else{
		return res.status(200).send(parcels);
	}
},

cancelOrder(req, res){
const parcel = parcelData.cancelOrder(req.params.id);
if(!parcel){
  return res.status(404).send({message:'parcel do not exist'});	
}
else{
	return res.status(200).send(parcel);
}
},

updateOrder(req, res){
if(req.body.weight =="" && req.body.pickup == "" && req.body.pickup_StNo == "" && req.body.destination == "" && req.body.destination_StNo == "" && req.body.receiver == "" && req.body.receiver_phone == ""){
  return res.status(404).send({message:'nothing updated'});
}

const updated = parcelData.updateOrder(req.params.id, req.body);

if(!updated){
  return res.status(404).send({message:'parcel do not exist'});
}

return res.status(200).send(updated);

}

};

export default parcel;