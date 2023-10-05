"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const specialist_controller_1 = __importDefault(require("../controllers/specialist.controller"));
const specialistRouter = express_1.default.Router();
const authInstance = new auth_middleware_1.default();
const specialistInstance = new specialist_controller_1.default();
//get all specialist
specialistRouter.get('/', specialistInstance.getAllSpecialist);
//get a specialist
specialistRouter.get('/:sid', specialistInstance.getSingleSpecialist);
//create a specialist
specialistRouter.post('/:bid', authInstance.isAuthenticated, authInstance.isAdmin, specialistInstance.createSingleSpecialist);
//update a specialist
specialistRouter.put('/:sid', authInstance.isAuthenticated, authInstance.isAdmin, specialistInstance.updateASpecialist);
//delete a specialist
specialistRouter.delete('/:sid', authInstance.isAuthenticated, authInstance.isAdmin, specialistInstance.deleteASpecialist);
exports.default = specialistRouter;
