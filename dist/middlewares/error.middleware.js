"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = require("../utils/http.error");
const unauthorized_error_1 = require("../utils/errors/unauthorized.error");
const ErrorMiddleware = (err, req, res, next) => {
    if (err instanceof unauthorized_error_1.UnauthorizedError) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            data: null,
        });
    }
    const status = err instanceof http_error_1.HttpError ? err.statusCode : 500;
    res.status(status).json({
        status,
        message: err.message || "Internal Server Error",
        data: null,
    });
};
exports.default = ErrorMiddleware;
