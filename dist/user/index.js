"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const schema_1 = require("./schema");
//import {redis} from '../redis';
const isAuthorized = async (req) => {
    const { error, value } = schema_1.schema.validate(req);
    console.log('isAuthorized', error, value, req);
    if (error) {
        return false;
    }
    // Mock validation
    const providedEmail = value.email;
    const providedPassword = value.password;
    //const correctPassword = await redis.getAsync(value.username);
    const correctEmail = 'admin@gmail.com';
    const correctPassword = 'adminadmin';
    return providedPassword == correctPassword && providedEmail == correctEmail;
};
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=index.js.map