import bcrypt from 'bcrypt';

let bhelp = {

  hashPassword(password){
  	 let salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(password, salt);
  },
  
  validatePassword(inputpassword, hashedpassword){
     return bcrypt.compareSync(inputpassword, hashedpassword);
  }
};

export default bhelp;