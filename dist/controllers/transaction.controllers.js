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
exports.GetBalance = GetBalance;
exports.GetTransactionHistory = GetTransactionHistory;
exports.TopUp = TopUp;
exports.PostTransaction = PostTransaction;
const transaction_services_1 = require("../services/transaction.services");
const http_error_1 = require("../utils/http.error");
function GetBalance(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
                throw new http_error_1.HttpError(401, "Unauthorized");
            }
            const balance = yield (0, transaction_services_1.getBalance)((_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
            res.status(200).json({
                status: 200,
                message: "Get Balance Berhasil",
                data: {
                    balance,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function GetTransactionHistory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
                throw new http_error_1.HttpError(401, "Unauthorized");
            }
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 10;
            const transactionHistory = yield (0, transaction_services_1.getTransactionHistory)(offset, limit, (_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
            res.status(200).json({
                status: 200,
                message: "Get History  Berhasil",
                data: transactionHistory,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function TopUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
                throw new http_error_1.HttpError(401, "Unauthorized");
            }
            const { top_up_amount } = req.body;
            yield (0, transaction_services_1.topUp)(top_up_amount, (_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
            const finalBalance = yield (0, transaction_services_1.getBalance)((_c = req.user) === null || _c === void 0 ? void 0 : _c.email);
            res.status(200).json({
                status: 200,
                message: "Top Up Balance berhasil",
                data: finalBalance,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function PostTransaction(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.email)) {
                throw new http_error_1.HttpError(401, "Unauthorized");
            }
            const { service_code } = req.body;
            const transaction = yield (0, transaction_services_1.createTransaction)(service_code, (_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
            res.status(200).json({
                status: 200,
                message: "Transaksi berhasil",
                data: transaction,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
