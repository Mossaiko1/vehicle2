import {Router} from 'express';
import { getVehicle, postVehicle, putVehicle, deleteVehicle } from '../controllers/vehicleController.js';


const routesVehicle = Router()

    routesVehicle.get('/vehicle', getVehicle);
    routesVehicle.post('/vehicle', postVehicle);
    routesVehicle.put('/vehicle/:id', putVehicle);
    routesVehicle.delete('/vehicle/:id', deleteVehicle);


export default routesVehicle;