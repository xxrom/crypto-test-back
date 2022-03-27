"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
//import {redis} from './redis';
dotenv_1.default.config();
const key = process.env.KEY;
const generateTokens = async (username) => {
    const accessToken = jsonwebtoken_1.default.sign({ username }, key, { expiresIn: '10m' }); // 10m
    const refreshToken = jsonwebtoken_1.default.sign({ username }, key, { expiresIn: '30d' });
    const tokens = {
        accessToken,
        refreshToken,
        //expiresIn: jwt.decode(accessToken).exp,
    };
    //await redis.setAsync(`${username}_access_token`, accessToken);
    //await redis.setAsync(`${username}_refresh_token`, refreshToken);
    return tokens;
};
exports.generateTokens = generateTokens;
//# sourceMappingURL=token.js.map