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
    const providedUser = value.username;
    const providedPassword = value.password;
    //const correctPassword = await redis.getAsync(value.username);
    const correctUser = 'admin';
    const correctPassword = 'adminadmin';
    return providedPassword == correctPassword && providedUser == correctUser;
};
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=index.js.map