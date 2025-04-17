"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionValidation = exports.TopUpValidation = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("./validate");
exports.TopUpValidation = [
    (0, express_validator_1.body)("top_up_amount")
        .notEmpty()
        .withMessage("Top up amount harus diisi")
        .isFloat()
        .withMessage("Top up amount harus berupa angka")
        .custom((value) => {
        if (value <= 0) {
            throw new Error("Top up amount harus lebih besar dari 0");
        }
        return true;
    }),
    validate_1.validate,
];
exports.CreateTransactionValidation = [
    (0, express_validator_1.body)("service_code")
        .notEmpty()
        .withMessage("Service code harus diisi")
        .isString()
        .withMessage("Service code harus berupa string"),
    validate_1.validate,
];
