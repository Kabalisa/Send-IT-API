import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import query from '../Data/parcelData';

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
  		return res.sendStatus(403).send({message:'No Token provided'});
  	}
  	try{
        const { id } = await jwt.verify(token, 'fadees');
        let sql = 'SELECT * FROM users WHERE userid = $1';
        let { rows } = await query(sql, [id]);
        if(!rows[0]){
        	return res.status(400).send({message:'Invalid token'});
        }
        req.body.userId = id;
        next();
  	}
    catch(error){
       return res.status(400).send(error.message);
    }
  }

};

export default bhelp;