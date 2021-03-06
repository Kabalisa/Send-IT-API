import { Pool, Client } from 'pg';


class Initial {

	constructor(){
    
     this.pool = new Pool({
               user: process.env.PGUSER,
               host: process.env.PGHOST,
               database: process.env.PGDATABASE,
               password: process.env.PGPASSWORD,
               port: process.env.PGPORT,
     });

     this.pool.on('connect', () => {
      console.log('connection to database has been successful');
     })

      this.pool.query('SELECT NOW()', (err,res) => {
        console.log(err,res);
        
      });



     this.createTables();
  
      }

      createTables() {

     	const table1 = `
     	  CREATE TABLE IF NOT EXISTS parcels(
     	  id SERIAL PRIMARY KEY,
     	  weight INT NOT NULL,
     	  price INT NOT NULL,
        pickup VARCHAR(30) NOT NULL,
        pickup_StNo VARCHAR(15) NOT NULL,
        destination VARCHAR(30) NOT NULL,
        destination_StNo VARCHAR(15) NOT NULL,
        email VARCHAR(30) NOT NULL REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE, 
        receiver VARCHAR(30) NOT NULL,
        receiver_phone INT,
        status VARCHAR(10),
        presentLocation VARCHAR(30)
        )`;
        
        try{
          this.pool.query(table1);
        }catch(error){
          console.log(error.message);
        }

        
           const table2 = `
               CREATE TABLE IF NOT EXISTS users(
               email VARCHAR(30) PRIMARY KEY,
     	         first_name VARCHAR(30) NOT NULL,
     	         last_name VARCHAR(30) NOT NULL,
               town VARCHAR(30) NOT NULL,
               street_number VARCHAR(15) NOT NULL,
               phone_number INT NOT NULL,
               password VARCHAR(70) NOT NULL
             )`;
            

            try{
              this.pool.query(table2);
            }
            catch(error){
              console.log(error.message);
            }
            finally{
              this.pool.end;
            }

     }

	
}

export default new Initial();