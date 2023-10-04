import express, { Router } from 'express';

import AuthMiddleware from '../middlewares/auth.middleware';
import SpecialistController from '../controllers/specialist.controller';

const specialistRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const specialistInstance = new SpecialistController();

//get all specialist
specialistRouter.get('/', specialistInstance.getAllSpecialist);

//get a specialist
specialistRouter.get('/:sid', specialistInstance.getSingleSpecialist);

//create a specialist
specialistRouter.post(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  specialistInstance.createSingleSpecialist
);

//update a specialist
specialistRouter.put(
  '/:sid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  specialistInstance.updateASpecialist
);

//delete a specialist
specialistRouter.delete(
  '/:sid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  specialistInstance.deleteASpecialist
);

export default specialistRouter;
