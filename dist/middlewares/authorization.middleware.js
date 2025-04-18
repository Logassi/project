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
exports.VerifyToken = VerifyToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_configs_1 = require("../configs/env.configs");
const unauthorized_error_1 = require("../utils/errors/unauthorized.error");
function VerifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                throw new unauthorized_error_1.UnauthorizedError("Token tidak valid atau kadaluwarsa");
            const user = (0, jsonwebtoken_1.verify)(token, env_configs_1.SECRET_KEY);
            // console.log(`test`);
            if (!user)
                throw new unauthorized_error_1.UnauthorizedError("Token tidak valid atau kadaluwarsa");
            req.user = user;
            next();
        }
        catch (err) {
            if (err instanceof Error && err.name === "JsonWebTokenError") {
                return next(new unauthorized_error_1.UnauthorizedError("Token tidak valid atau kadaluwarsa"));
            }
            if (err instanceof Error && err.name === "TokenExpiredError") {
                return next(new unauthorized_error_1.UnauthorizedError("Token telah kadaluwarsa"));
            }
            next(err);
        }
    });
}
