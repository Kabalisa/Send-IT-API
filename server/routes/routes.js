import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/*create a parcel delivery order the user want*/
router.post('/parcels', parcelController.create);

export default router;