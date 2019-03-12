import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const pool  = new Pool(
  {
   user: process.env.PGUSER,
   host: process.env.PGHOST,
   database: process.env.PGDATABASE,
   password: process.env.PGPASSWORD,
   port: process.env.PGPORT,
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