import express from 'express';
import userController from '../Controllers/parcelController';

const routerr = express.Router();

routerr.post('/signup', userController.signup);

routerr.post('/signin', userController.signin);

routerr.get('/list/users', userController.getUsers);

export default routerr;