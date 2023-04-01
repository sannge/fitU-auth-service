"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@sanngetickets/common");
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.signUpRouter = router;
router.post("/api/users/signup", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser) {
        throw new common_1.BadRequestError("Email in use");
    }
    if (confirmPassword !== password) {
        throw new common_1.BadRequestError("Passwords do not match.");
    }
    const user = user_1.User.build({
        email,
        password,
    });
    yield user.save();
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY);
    return res.status(201).json({
        user,
        userJwt,
    });
}));
