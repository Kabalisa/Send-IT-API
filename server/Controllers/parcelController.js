import query from '../Data/parcelData';

const parcel = {
  
async getAll(req, res){

 let sql = `
 SELECT * FROM parcels
 `; 

 try{
  const { rows, rowCount } = await query(sql);
  return res.status(200).send({ rows, rowCount });
  catch(error){
    return res.status(400).send(error.message);
  }
}
};

export default parcel;