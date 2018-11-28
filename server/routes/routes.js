import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

/*DELETE a specified parcel delivery order*/
router.delete('/parcels/:id/delete', parcelController.delete);

export default router;