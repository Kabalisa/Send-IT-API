import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const pool  = new Pool(
  {
   user: 'postgres',
   host: 'localhost',
   database: 'sendit',
   password: 'Kif@0788475785',
   port: 5432,
  }
  );

pool.on('connect', () => {
  console.log('connected to database succesfully');
});

const query = (sql, data) => {
   try{
    let result = pool.query(sql, data);
    return result;
   }
   catch(error){
     console.log(error.message);
   }
   finally{
    pool.end;
   }
};

export default query;