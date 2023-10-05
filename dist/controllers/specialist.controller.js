"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
const specialist_model_1 = __importDefault(require("../models/specialist.model"));
const beautyPackage_model_1 = __importDefault(require("../models/beautyPackage.model"));
class SpecialistController {
    constructor() { }
    async getAllSpecialist(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const specialists = await specialist_model_1.default.find({});
                res.status(200).json(specialists);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getSingleSpecialist(req, res) {
        try {
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'Specialist not found!' });
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.findById(sid);
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createSingleSpecialist(req, res) {
        try {
            const { name, designaion, bio, photoUrl, dateOfBirth } = req.body;
            const { bid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: 'beauty package not found!' });
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.create({
                    name,
                    designaion,
                    bio,
                    photoUrl,
                    dateOfBirth,
                });
                await beautyPackage_model_1.default.findByIdAndUpdate(bid, {
                    $addToSet: {
                        specialists: specialist === null || specialist === void 0 ? void 0 : specialist._id,
                    },
                });
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateASpecialist(req, res) {
        try {
            const { name, designaion, bio, photoUrl, dateOfBirth } = req.body;
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'specialist not found!' });
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.findByIdAndUpdate(sid, {
                    name,
                    designaion,
                    bio,
                    photoUrl,
                    dateOfBirth,
                }, { new: true });
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteASpecialist(req, res) {
        try {
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: 'Specialist not found' });
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_model_1.default.findByIdAndDelete(sid);
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = SpecialistController;
