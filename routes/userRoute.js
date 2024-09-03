import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';

const routesUser = Router()

    routesUser.post('/create', createUser);
    routesUser.post('/login', loginUser);
    routesUser.get('/users', getUser);
    routesUser.put('/:id', updateUser);
    routesUser.delete('/:id', deleteUser);

export default routesUser;