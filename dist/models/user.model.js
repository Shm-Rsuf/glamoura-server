"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    role: {
        enum: ['user', 'admin'],
        default: 'user',
        type: String,
        required: true,
    },
    bookings: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
}, {
    timestamps: true,
});
/* register for user */
userSchema.statics.register = async function (name, email, password, photoUrl, address, phoneNumber) {
    if (!name || !email || !password || !photoUrl) {
        throw new Error('must be filled name, email, password, photoUrl');
    }
    const existingEmail = await this.findOne({ email });
    if (existingEmail) {
        throw new Error('email already exist');
    }
    if (!validator_1.default.isEmail(email)) {
        throw new Error('invalid email');
    }
    if (!validator_1.default.isStrongPassword(password)) {
        throw new Error('password is not strong. It should be at least 8 characters, use both uppercase and lowercase letters, include at least one number, and have one special character.');
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashPassword = await bcrypt_1.default.hash(password, salt);
    const user = await this.create({
        name,
        email,
        password: hashPassword,
        photoUrl,
        address,
        phoneNumber,
    });
    return user;
};
/* user login function */
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('must be filled email and password');
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('incorrect email or password');
    }
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new Error('incorrect email or password');
    }
    return user;
};
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
