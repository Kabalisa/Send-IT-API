import express from 'express';
import userController from '../Controllers/parcelController';
import bhelp from '../helpers/bhelp';

const routerr = express.Router();

routerr.post('/signup', userController.signup);

routerr.post('/signin', userController.signin);

routerr.get('/list/users', bhelp.checkToken, userController.getUsers);

routerr.delete('/myprofile/delete', bhelp.checkToken, userController.deleteUser);

routerr.put('/myprofile/update', bhelp.checkToken, userController.updateDetails);

export default routerr;