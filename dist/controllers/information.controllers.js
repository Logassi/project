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
exports.GetBanner = GetBanner;
exports.GetService = GetService;
const information_services_1 = require("../services/information.services");
function GetBanner(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, information_services_1.getBanner)();
            res.status(200).json({
                status: 200,
                message: "Sukses",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function GetService(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, information_services_1.getService)();
            res.status(200).json({
                status: 200,
                message: "Sukses",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
