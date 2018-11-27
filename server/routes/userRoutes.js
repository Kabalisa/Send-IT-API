import express from 'express';
import userController from '../Controllers/parcelController';

const route = express.Router();

route.post('auth/signup', userController.signup);

export default route;