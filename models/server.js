import express from 'express';
import 'dotenv/config';
import dbConnection from '../database/config.js';
import { getVehicle, postVehicle, putVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { createUser, getUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';

export default class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbConnect();
        this.pathVehicle = '/api/vehicle'; // Link public API
        this.pathUser = '/api/user'; // Link user API
        this.route();
    }

    listen() { // Method to listen on the port
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT ${process.env.PORT}`);
        });
    }

    async dbConnect() { // Call method dbConnection to connect to Mongo
        await dbConnection();
    }

    route() {
        this.app.use(express.json()); // Convert data to json

        // Vehicle routes
        this.app.get(this.pathVehicle, getVehicle);
        this.app.post(this.pathVehicle, postVehicle);
        this.app.put(this.pathVehicle + '/:id', putVehicle); // Fixed route for PUT
        this.app.delete(this.pathVehicle + '/:id', deleteVehicle); // Fixed route for DELETE

        // User routes
        this.app.post(`${this.pathUser}/create`, createUser); // Create user
        this.app.post(`${this.pathUser}/login`, loginUser); // Login user
        this.app.get(this.pathUser, getUser); // Get user (probably needs an ID or similar to be effective)
        this.app.put(this.pathUser + '/:id', updateUser); // Update user
        this.app.delete(this.pathUser + '/:id', deleteUser); // Delete user
    }
}
