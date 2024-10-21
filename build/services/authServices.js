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
exports.createUserService = void 0;
const hashPassword_1 = require("../utils/hashPassword");
const types_1 = require("../types/types");
const db_1 = __importDefault(require("../config/db"));
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, lastName } = data;
    const existUser = yield db_1.default.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!existUser) {
        throw new types_1.CustomErrorImpl(400, "User already exist.");
    }
    try {
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
        const user = yield db_1.default.user.create({
            data: {
                name,
                lastName,
                password: hashedPassword,
                email,
            },
        });
        return user;
    }
    catch (_a) {
        throw new types_1.CustomErrorImpl(500, "Internal Server Error.");
    }
});
exports.createUserService = createUserService;