import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/*GET all parcels of a specific user*/
router.get('/users/:id/parcels', parcelController.getAllUserParcels);

export default router;