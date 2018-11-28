import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

router.put('/parcels/:id/destination', parcelController.destination);

export default router;