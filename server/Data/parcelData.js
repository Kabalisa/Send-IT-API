
//function to calculate class

function getPrice(weight) {
	return Number(weight) * 1000;
}

class Parcel{

constructor(){
	this.parcels = [
      {
       id : '1',
       weight : '4 kg',
       price : '4000',
       pickup_StNo: 'KN 245 St',
       pickup : 'nyamirambo',
       destination_StNo: 'KN 478 St',
       destination : 'remera',
       userId : '980768',
       receiver : 'mucyo',
       receiver_phone: '0788465633',
       status : 'pending',
       presentLocation : 'kinamba'
      },
      
      {
       id : '2',
       weight : '2 kg',
       price : '2000',
       pickup_StNo: 'KN 345 St',
       pickup : 'byimana',
       destination_StNo: 'KN 244 St',
       destination : 'nkoto',
       userId : '657384',
       receiver : 'butati',
       receiver_phone: '0734554434',
       status : 'pending',
       presentLocation : 'mukagi'
      },  

      {
       id : '3',
       weight : '10 kg',
       price : '10000',
       pickup_StNo: 'KN 445 St',
       pickup : 'kanombe',
       destination_StNo: 'KN 342 St',
       destination : 'ruyenzi',
       userId : '989876',
       receiver : 'eric',
       receiver_phone: '0784663212',
       status : 'pending',
       presentLocation : 'nyabugogo'
      },   
     ];
}

   create(item) {
   	var cId = Number.parseInt(this.parcels[this.parcels.length - 1].id) + 1;

   	const newParcel = {
   		id : cId,
        weight : item.weight,
        price : getPrice(item.weight),
        pickup_StNo : item.pickup_StNo,
        pickup : item.pickup,
        destination_StNo : item.destination_StNo,
        destination : item.destination,
        userId : item.userId,
        receiver : item.receiver,
        receiver_phone : item.receiver_phone,
        status : 'pending',
        presentLocation : item.pickup,
        };

       this.parcels.push(newParcel);
       return newParcel;
   }

   getOne(id){
   	return this.parcels.find(parcel => parcel.id === id);
   }

   getAll(){
   	return this.parcels;
   }
   
   delete(id){
    const parcel = this.getOne(id);
    if(parcel){
    const index = this.parcels.indexOf(parcel);
    this.parcels.splice(index,1); 
    return true;
    }
    return false;
   }

   getAllUserParcels(id){
      const userParcels = [];
      this.parcels.forEach((parcel) => {

         if(parcel.userId === id) {
         	userParcels.push(parcel);
         }

      });

      if(userParcels.length === 0){
      	return userParcels;
      }
      else{
      	return userParcels;
      }

   }

   cancelOrder(id){
   	const parcel = this.getOne(id);
   	if(parcel){
     const index = this.parcels.indexOf(parcel);
     this.parcels[index].status = 'canceled';
     return this.parcels[index];
     }
   return parcel;
   }

   updateOrder(id, item){
    const parcel = this.getOne(id);
    if(parcel){
      const index = this.parcels.indexOf(parcel);
      this.parcels[index].weight = item.weight;
      this.parcels[index].price = getPrice(item.weight);
      this.parcels[index].pickup_StNo = item.pickup_StNo;
      this.parcels[index].pickup = item.pickup;
      this.parcels[index].destination_StNo = item.destination_StNo;
      this.parcels[index].destination = item.destination;
      this.parcels[index].receiver = item.receiver;
      this.parcels[index].receiver_phone = item.receiver_phone;
      this.parcels[index].presentLocation = item.pickup;
      return this.parcels[index];
    }
    return parcel;
   }

}

export default new Parcel();