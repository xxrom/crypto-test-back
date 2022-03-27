"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object().keys({
    username: joi_1.default.string()
        .min(3)
        .max(24)
        .alphanum()
        .required(),
    password: joi_1.default.string()
        .min(8)
        .max(64)
        .required(),
});
//# sourceMappingURL=schema.js.map