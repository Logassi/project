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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUserProfile = getUserProfile;
exports.updateUser = updateUser;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
const http_error_1 = require("../utils/http.error");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_configs_1 = require("../configs/env.configs");
const prisma = new client_1.PrismaClient();
function registerUser(userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, first_name, last_name, password } = userInput;
        const findUserEmail = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (findUserEmail) {
            console.log("Register failed : Bad request");
            throw new http_error_1.HttpError(400, "Bad Request");
        }
        const salt = yield (0, bcrypt_1.genSalt)(10);
        const hashingPassword = yield (0, bcrypt_2.hash)(password, salt);
        yield prisma.user.create({
            data: {
                email,
                first_name,
                last_name,
                password: hashingPassword,
            },
        });
    });
}
function loginUser(userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = userInput;
        const findUser = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!findUser)
            throw new http_error_1.HttpError(401, "Username atau password salah");
        // password minimal 8
        const isValid = yield (0, bcrypt_1.compare)(password, findUser.password);
        if (!isValid)
            throw new http_error_1.HttpError(401, "Username atau password salah");
        const payload = {
            email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // 12 hours
        };
        const token = (0, jsonwebtoken_1.sign)(payload, env_configs_1.SECRET_KEY);
        return token;
    });
}
function getUserProfile(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    });
}
function updateUser(email, userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new http_error_1.HttpError(404, "User not found");
        return yield prisma.user.update({
            where: { email },
            data: userInput,
        });
    });
}
