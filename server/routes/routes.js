import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/* GET all parcel delivery orders */
router.get('/parcels', parcelController.getAll);

export default router;