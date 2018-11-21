import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/* GET all parcel delivery orders */
router.get('/parcels', parcelController.getAll);

/* GET a specific Parcel delivery order*/
router.get('/parcels/:id', parcelController.getOne);

export default router;