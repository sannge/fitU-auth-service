"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const check_authorization_1 = require("../middlewares/check-authorization");
const router = express_1.default.Router();
exports.currentUserRouter = router;
router.get("/api/users/currentuser", check_authorization_1.checkAuthorization, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});
