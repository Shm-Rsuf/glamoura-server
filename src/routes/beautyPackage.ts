import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
const beautyPackageRouter: Router = express.Router();
const authInstance = new AuthMiddleware();

//get all beautyPackage
beautyPackageRouter.get('/');

//get a single beautyPackage
beautyPackageRouter.get('/:bid');

//create a beautyPackage
beautyPackageRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin
);

//update a beautyPackage
beautyPackageRouter.put(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin
);

//delete a beautyPackage
beautyPackageRouter.delete(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin
);

export default beautyPackageRouter;
