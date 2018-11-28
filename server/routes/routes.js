import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/*cancel a specific parcel delivery order*/
router.put('/parcels/:id/cancel', parcelController.cancelOrder);

export default router;