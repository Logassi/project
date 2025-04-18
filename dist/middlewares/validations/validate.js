"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const express_validator_1 = require("express-validator");
const http_error_1 = require("../../utils/http.error");
function validate(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array({ onlyFirstError: true })[0];
            return next(new http_error_1.HttpError(400, firstError.msg));
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
