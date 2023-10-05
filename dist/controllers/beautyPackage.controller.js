"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const beautyPackage_model_1 = __importDefault(require("../models/beautyPackage.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class BeautyPackageController {
    constructor() { }
    async getAllBeautyPackages(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const beautyPackages = await beautyPackage_model_1.default.find({});
                res.status(200).json(beautyPackages);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getSingleBeautyPackage(req, res) {
        try {
            const { bid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: 'beautyPackage not found!' });
            }
            await Promise.resolve().then(async () => {
                const beautyPackage = await beautyPackage_model_1.default.findById(bid);
                res.status(200).json(beautyPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createSingleBeautyPackage(req, res) {
        try {
            const { title, description, category, images, price } = req.body;
            await Promise.resolve().then(async () => {
                const beautyPackage = await beautyPackage_model_1.default.create({
                    title,
                    description,
                    category,
                    images,
                    price,
                });
                res.status(200).json(beautyPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateBeautyPackage(req, res) {
        try {
            const { title, description, category, images, price } = req.body;
            const { bid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: 'beauty package not found!' });
            }
            await Promise.resolve().then(async () => {
                const beautyPackage = await beautyPackage_model_1.default.findByIdAndUpdate(bid, {
                    title,
                    description,
                    category,
                    images,
                    price,
                }, { new: true });
                res.status(200).json(beautyPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteBeautyPackage(req, res) {
        try {
            const { bid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: 'beauty package not found!' });
            }
            await Promise.resolve().then(async () => {
                const beautyPackage = await beautyPackage_model_1.default.findByIdAndDelete(bid);
                res.status(200).json(beautyPackage);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = BeautyPackageController;
