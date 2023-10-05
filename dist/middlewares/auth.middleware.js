"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_token_manager_1 = __importDefault(require("../manager/jwt-token.manager"));
const jwtInstance = new jwt_token_manager_1.default();
class AuthMiddleware {
    constructor() { }
    async isAuthenticated(req, res, next) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'unauthorized token' });
            return;
        }
        try {
            const payload = jwtInstance.verifyToken(token);
            const user = await user_model_1.default.findById(payload.id);
            if (!user) {
                res.status(401).json({ message: 'unauthorized user' });
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'unauthorized token' });
            return;
        }
    }
    async isAdmin(req, res, next) {
        const user = req.user;
        if (user && user.role === 'admin') {
            next();
        }
        else {
            res.status(401).json({ message: 'forbidden' });
            return;
        }
    }
}
exports.default = AuthMiddleware;
