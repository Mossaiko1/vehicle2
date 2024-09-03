import express from 'express';
import 'dotenv/config';
import dbConnection from '../database/config.js';
import routesVehicle from '../routes/vehicleRoute.js';
import routesUser from '../routes/userRoute.js';

export default class Server {
    constructor() {
        this.app = express();
        this.pathVehicle = '/api/vehicle'; // Link public API
        this.pathUser = '/api/user'; // Link user API
        this.dbConnect();
        this.route();
        this.listen();
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
        this.app.use(this.pathVehicle, routesVehicle); // Link routes to vehicle API

        // User routes
        this.app.use(this.pathUser, routesUser); // Link routes to user API
    }
}
