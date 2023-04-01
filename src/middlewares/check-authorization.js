"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
const common_1 = require("@sanngetickets/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkAuthorization(req, res, next) {
    if (!req.headers.authorization) {
        throw new common_1.NotAuthorizedError();
    }
    const token = req.headers.authorization;
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (err) {
        throw new common_1.NotAuthorizedError();
    }
    next();
}
exports.checkAuthorization = checkAuthorization;
