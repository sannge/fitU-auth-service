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
exports.resetPasswordRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("@sanngetickets/common");
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.resetPasswordRouter = router;
router.post("/api/users/resetpassword", [
    (0, express_validator_1.body)("email").isEmail().withMessage("must be a valid Email."),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("Password field is required."),
], common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (!existingUser) {
        throw new common_1.BadRequestError("Invalid Crendentials");
    }
    if (password !== confirmPassword) {
        throw new common_1.BadRequestError("Passwords do not match");
    }
    existingUser.set({
        password,
    });
    yield existingUser.save();
    res.status(200).send({ user: existingUser });
}));
