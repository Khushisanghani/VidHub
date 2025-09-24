import express from 'express';
import { Login, register } from '../controller/authController.js';
const userRoute = express.Router();
userRoute.post('/register',register);
userRoute.post('/login',Login);
export default userRoute;