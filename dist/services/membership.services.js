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
exports.updateUserImage = updateUserImage;
exports.getOldProfileImageUrl = getOldProfileImageUrl;
exports.deleteOldProfileImage = deleteOldProfileImage;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
const http_error_1 = require("../utils/http.error");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_configs_1 = require("../configs/env.configs");
const supabase_configs_1 = require("../configs/supabase.configs");
const prisma = new client_1.PrismaClient();
function registerUser(userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, first_name, last_name, password } = userInput;
        const findUserEmail = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        // for user friendly error message
        // if (findUserEmail) {
        //   throw new HttpError(409, "Email sudah digunakan");
        // }
        // for security reason, when don't want to expose if the email is already registered or not
        if (findUserEmail) {
            throw new http_error_1.HttpError(400, "Registrasi gagal. Silakan periksa data Anda.");
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
            throw new http_error_1.HttpError(401, "Email atau password salah");
        const isValid = yield (0, bcrypt_1.compare)(password, findUser.password);
        if (!isValid)
            throw new http_error_1.HttpError(401, "Email atau password salah");
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
function updateUserImage(email, image) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new http_error_1.HttpError(404, "User not found");
        const updatedUserImage = yield prisma.user.update({
            where: { email },
            data: {
                profile_image: image,
            },
        });
        return {
            email: updatedUserImage.email,
            first_name: updatedUserImage.first_name,
            last_name: updatedUserImage.last_name,
            profile_image: updatedUserImage.profile_image,
        };
    });
}
function getOldProfileImageUrl(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: { email },
            select: { profile_image: true },
        });
        return user === null || user === void 0 ? void 0 : user.profile_image; // Return the old image URL
    });
}
function deleteOldProfileImage(oldImageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = oldImageUrl.split("/profile-image/")[1];
        const { error } = yield supabase_configs_1.supabase.storage
            .from("profile-image")
            .remove([filePath]);
        if (error) {
            throw new http_error_1.HttpError(500, "Failed to delete old profile image");
        }
    });
}
