import express from 'express';
import userController from '../Controllers/parcelController';
import bhelp from '../helpers/bhelp';

const routerr = express.Router();

routerr.post('/signup', userController.signup);

routerr.post('/signin', userController.signin);

routerr.get('/list/users', userController.getUsers);

routerr.delete('/myprofile/delete', bhelp.checkToken, userController.deleteUser);

export default routerr;