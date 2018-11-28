import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/*UPDATE a specific parcel delivery order*/
router.put('/parcels/:id/update', parcelController.updateOrder)

export default router;