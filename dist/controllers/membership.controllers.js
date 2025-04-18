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
exports.Register = Register;
exports.Login = Login;
exports.GetProfile = GetProfile;
exports.Update = Update;
exports.UpdateImage = UpdateImage;
const client_1 = require("@prisma/client");
const http_error_1 = require("../utils/http.error");
const membership_services_1 = require("../services/membership.services");
const uploader_utils_1 = require("../utils/uploader.utils");
const prisma = new client_1.PrismaClient();
function Register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, membership_services_1.registerUser)(req.body);
            res.status(201).json({
                status: 201,
                message: "Registrasi berhasil silahkan login",
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function Login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield (0, membership_services_1.loginUser)(req.body);
            res.status(200).json({
                status: 200,
                message: "Login Sukses",
                data: {
                    token,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function GetProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
                throw new http_error_1.HttpError(401, "Unauthorized");
            }
            const user = yield (0, membership_services_1.getUserProfile)((_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
            res.status(200).json({
                status: 200,
                message: "Sukses",
                data: {
                    email: user === null || user === void 0 ? void 0 : user.email,
                    first_name: user === null || user === void 0 ? void 0 : user.first_name,
                    last_name: user === null || user === void 0 ? void 0 : user.last_name,
                    profile_image: user === null || user === void 0 ? void 0 : user.profile_image,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function Update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
                throw new http_error_1.HttpError(401, "Unauthorized");
            }
            const updatedUser = yield (0, membership_services_1.updateUser)((_b = req.user) === null || _b === void 0 ? void 0 : _b.email, req.body);
            res.status(200).json({
                status: 200,
                message: "Update Profile Berhasil",
                data: {
                    email: updatedUser.email,
                    first_name: updatedUser.first_name,
                    last_name: updatedUser.last_name,
                    profile_image: updatedUser.profile_image,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function UpdateImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email))
                throw new http_error_1.HttpError(401, "Unauthorized");
            const file = req.file;
            if (!file)
                throw new http_error_1.HttpError(400, "No file uploaded");
            const filePath = `profile-images/${Date.now()}-${file.originalname}`;
            const result = yield (0, uploader_utils_1.uploadImageToSupabase)(file, filePath);
            const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/profile-image/${filePath}`;
            const oldProfileImage = yield (0, membership_services_1.getOldProfileImageUrl)(req.user.email);
            const updatedUser = yield (0, membership_services_1.updateUserImage)(req.user.email, publicUrl);
            if (oldProfileImage) {
                yield (0, membership_services_1.deleteOldProfileImage)(oldProfileImage);
            }
            res.status(200).json({
                status: 200,
                message: "Update Profile Image berhasil",
                data: updatedUser,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
