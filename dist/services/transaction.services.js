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
exports.getBalance = getBalance;
exports.getTransactionHistory = getTransactionHistory;
exports.topUp = topUp;
exports.createTransaction = createTransaction;
const client_1 = require("@prisma/client");
const http_error_1 = require("../utils/http.error");
const prisma = new client_1.PrismaClient();
function getBalance(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                balance: true,
            },
        });
        return data === null || data === void 0 ? void 0 : data.balance;
    });
}
function getTransactionHistory(offset, limit, email) {
    return __awaiter(this, void 0, void 0, function* () {
        // this one is tricky
        // because the requirement said, only get user transaction history only
        // meaning, there is join from transaction table to user table
        const data = yield prisma.transactionHistory.findMany({
            where: {
                user: {
                    email: email,
                },
            },
            skip: offset,
            take: limit,
            orderBy: {
                created_on: "desc", // Optional: latest transactions first
            },
            select: {
                invoice_number: true,
                transaction_type: true,
                description: true,
                total_amount: true,
                created_on: true,
            },
        });
        const totalRecords = yield prisma.transactionHistory.count({
            where: {
                user: {
                    email,
                },
            },
        });
        return { offset, limit, totalRecords: totalRecords, records: data };
    });
}
function topUp(amount, email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.update({
            where: {
                email: email,
            },
            data: {
                balance: {
                    increment: amount,
                },
            },
        });
    });
}
function createTransaction(service_code, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isService = yield prisma.service.findUnique({
            where: {
                service_code,
            },
        });
        if (!isService) {
            throw new http_error_1.HttpError(401, "Service atas Layanan tidak ditemukan");
        }
        const user = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new http_error_1.HttpError(401, "User tidak ditemukan");
        }
        if ((user === null || user === void 0 ? void 0 : user.balance) < isService.service_tariff) {
            throw new http_error_1.HttpError(401, "Saldo tidak mencukupi");
        }
        const transactionCount = yield prisma.transactionHistory.count({
            where: {
                user: {
                    email,
                },
            },
        });
        const now = new Date();
        // Format date to DDMMYYYY
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
        const year = now.getFullYear();
        const formattedDate = `${day}${month}${year}`;
        const transaction = yield prisma.transactionHistory.create({
            data: {
                invoice_number: `INV${formattedDate}-${transactionCount + 1}`,
                transaction_type: "PAYMENT",
                description: `Top Up ${service_code}`,
                total_amount: isService.service_tariff, // example amount
                created_on: new Date(),
                user: {
                    connect: {
                        email: email,
                    },
                },
            },
        });
        yield prisma.user.update({
            where: {
                email: email,
            },
            data: {
                balance: {
                    decrement: isService.service_tariff,
                },
            },
        });
        return {
            invoice_numer: transaction.invoice_number,
            service_code,
            service_name: isService.service_name,
            transaction_type: transaction.transaction_type,
            total_amount: transaction.total_amount,
            created_on: transaction.created_on,
        };
    });
}
