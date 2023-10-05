"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class jwtTokenManager {
    constructor() {
        this.secret = process.env.JWT_SECRET;
        this.expiresIn = '7d';
    }
    createToken(id) {
        try {
            const token = jsonwebtoken_1.default.sign({ id }, this.secret, {
                expiresIn: this.expiresIn,
            });
            return token;
        }
        catch (error) {
            throw Error('token creation failed!');
        }
    }
    verifyToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this.secret);
            return payload;
        }
        catch (error) {
            throw Error('token verification failed!');
        }
    }
}
exports.default = jwtTokenManager;
