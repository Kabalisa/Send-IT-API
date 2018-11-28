import express from 'express';
import parcelController from '../Controllers/parcelController';

const router = express.Router();

router.put('/parcels/:id/status', parcelController.status);

export default router;