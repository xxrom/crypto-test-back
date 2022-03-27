"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = __importDefault(require("redis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redis = redis_1.default.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});
//# sourceMappingURL=redis.js.map