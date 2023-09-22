import express, { Router } from 'express';

const authRourer: Router = express.Router();

//register
authRourer.post('/register');

//login
authRourer.post('/login');

export default authRourer;
