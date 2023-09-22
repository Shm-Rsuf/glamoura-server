import express, { Router } from 'express';
const beautyPackageRouter: Router = express.Router();

//get all beautyPackage
beautyPackageRouter.get('/');

//get a single beautyPackage
beautyPackageRouter.get('/:bid');

//create a beautyPackage
beautyPackageRouter.post('/');

//update a beautyPackage
beautyPackageRouter.put('/:bid');

//delete a beautyPackage
beautyPackageRouter.delete('/:bid');

export default beautyPackageRouter;
