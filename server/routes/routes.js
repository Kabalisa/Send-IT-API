import express from 'express';
import parcelController from '../Controllers/parcelController';
import bhelp from '../helpers/bhelp';

const router = express.Router();

/* GET all parcel delivery orders */
router.get('/parcels', parcelController.getAll);

/* GET a specific Parcel delivery order*/
router.get('/parcels/:id', parcelController.getOne);

/*cancel a specific parcel delivery order*/
router.put('/parcels/:id/cancel', parcelController.cancelOrder);

/*GET all parcels of a specific user*/
router.get('/users/:id/parcels', parcelController.getAllUserParcels);

/*create a parcel delivery order the user want*/
router.post('/parcels', bhelp.checkToken, parcelController.create);

/*DELETE a specified parcel delivery order*/
router.delete('/parcels/:id/delete', parcelController.delete);

/*UPDATE a specific parcel delivery order*/
router.put('/parcels/:id/update', parcelController.updateOrder);

router.put('/parcels/:id/presentLocation', bhelp.checkToken, parcelController.presentLocation);

router.put('/parcels/:id/status', bhelp.checkToken, parcelController.status);

router.put('/parcels/:id/destination', bhelp.checkToken, parcelController.destination);

export default router;