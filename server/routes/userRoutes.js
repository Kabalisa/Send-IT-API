import express from 'express';
import userController from '../Controllers/parcelController';

const routerr = express.Router();

routerr.post('/signup', userController.signup);

export default routerr;