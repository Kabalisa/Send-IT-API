import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import query from '../Data/parcelData';
import joi from 'joi';

let bhelp = {

  hashPassword(password){
  	 let salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(password, salt);
  },
  
  validatePassword(inputpassword, hashedpassword){
     return bcrypt.compareSync(inputpassword, hashedpassword);
  },

  makeToken(id){
  	const token = jwt.sign({ id }, 'fadees', { expiresIn : '2h' });
  	return token;
  },

  async checkToken(req, res, next){
  	const token = req.headers['x-access-token'];
  	if(!token){
  		return res.status(403).send({message:'No Token provided'});
  	}
  	try{
        const { id } = await jwt.verify(token, 'fadees');
        // let sql = 'SELECT * FROM users WHERE userid = $1';
        // let { rows } = await query(sql, [id]);
        // if(!rows[0]){
        // 	return res.status(400).send({message:'Invalid token'}); // was supposed to valisate error. but with errors no id id decoded hence sql do not happen.
        // }
        req.body.userId = id;
        req.body.user = id;
        next();
  	}
    catch(error){
       return res.status(400).send(error.message);
    }
  },

  validateEmail(check){
      
  const email = {
    data: check
  };

  const schema = joi.object().keys({
    data: joi.string().trim().email({ minDomainAtoms: 2 }).required()
  });

  return joi.validate(email, schema);

  }

};

export default bhelp;