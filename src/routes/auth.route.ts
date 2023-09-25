import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRourer: Router = express.Router();

const authInstance = new AuthController();

//register
authRourer.post('/register', authInstance.register);

//login
authRourer.post('/login', authInstance.login);

export default authRourer;
