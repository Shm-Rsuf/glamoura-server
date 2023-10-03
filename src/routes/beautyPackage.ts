import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import BeautyPackageController from '../controllers/beautyPackage.controller';
const beautyPackageRouter: Router = express.Router();
const authInstance = new AuthMiddleware();
const beautyPackageInstance = new BeautyPackageController();

//get all beautyPackage
beautyPackageRouter.get('/', beautyPackageInstance.getAllBeautyPackages);

//get a single beautyPackage
beautyPackageRouter.get('/:bid', beautyPackageInstance.getSingleBeautyPackage);

//create a beautyPackage
beautyPackageRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.createSingleBeautyPackage
);

//update a beautyPackage
beautyPackageRouter.put(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.updateBeautyPackage
);

//delete a beautyPackage
beautyPackageRouter.delete(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.deleteBeautyPackage
);

export default beautyPackageRouter;
