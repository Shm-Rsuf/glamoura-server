"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const beautyPackage_controller_1 = __importDefault(require("../controllers/beautyPackage.controller"));
const beautyPackageRouter = express_1.default.Router();
const authInstance = new auth_middleware_1.default();
const beautyPackageInstance = new beautyPackage_controller_1.default();
//get all beautyPackage
beautyPackageRouter.get('/', beautyPackageInstance.getAllBeautyPackages);
//get a single beautyPackage
beautyPackageRouter.get('/:bid', beautyPackageInstance.getSingleBeautyPackage);
//create a beautyPackage
beautyPackageRouter.post('/', authInstance.isAuthenticated, authInstance.isAdmin, beautyPackageInstance.createSingleBeautyPackage);
//update a beautyPackage
beautyPackageRouter.put('/:bid', authInstance.isAuthenticated, authInstance.isAdmin, beautyPackageInstance.updateBeautyPackage);
//delete a beautyPackage
beautyPackageRouter.delete('/:bid', authInstance.isAuthenticated, authInstance.isAdmin, beautyPackageInstance.deleteBeautyPackage);
exports.default = beautyPackageRouter;
