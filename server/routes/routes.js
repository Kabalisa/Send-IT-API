import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/* GET all parcel delivery orders */
router.get('/parcels', parcelController.getAll);

/* GET a specific Parcel delivery order*/
router.get('/parcels/:id', parcelController.getOne);

/*cancel a specific parcel delivery order*/
router.put('/parcels/:id/cancel', parcelController.cancelOrder);

export default router;