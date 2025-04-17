"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateValidation = exports.LoginValidation = exports.RegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("./validate");
exports.RegisterValidation = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email harus diisi")
        .isEmail()
        .withMessage("Parameter email tidak sesuai format"),
    (0, express_validator_1.body)("first_name")
        .notEmpty()
        .withMessage("First name harus diisi")
        .isString()
        .withMessage("First name harus string"),
    (0, express_validator_1.body)("last_name")
        .notEmpty()
        .withMessage("Last name diisi")
        .isString()
        .withMessage("Last name harus string"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password harus diisi")
        .isLength({ min: 8 })
        .withMessage("Password harus minimal 8 karakter panjangnya")
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        .withMessage("Password harus mengandung setidaknya 1 huruf besar, 1 angka, dan 1 karakter khusus"),
    validate_1.validate,
];
exports.LoginValidation = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email harus diisi")
        .isEmail()
        .withMessage("Parameter email tidak sesuai format"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password harus diisi")
        .isLength({ min: 8 })
        .withMessage("Password harus minimal 8 karakter panjangnya"),
    validate_1.validate,
];
exports.UpdateValidation = [
    (0, express_validator_1.body)("email")
        .optional()
        // .withMessage("Tidak boleh string kosong")
        .notEmpty()
        .withMessage("Email tidak boleh kosong")
        .isEmail()
        .withMessage("Parameter email tidak sesuai format"),
    (0, express_validator_1.body)("first_name")
        .optional()
        // .withMessage("Tidak boleh string kosong")
        .notEmpty()
        .withMessage("First name tidak boleh kosong")
        .isString()
        .withMessage("First name harus berupa string"),
    (0, express_validator_1.body)("last_name")
        .optional()
        // .withMessage("Tidak boleh string kosong")
        .notEmpty()
        .withMessage("Last name tidak boleh kosong")
        .isString()
        .withMessage("Last name harus berupa string"),
    (0, express_validator_1.body)("profile_image")
        .optional()
        // .withMessage("Tidak boleh string kosong")
        // need some modification to validate image url
        // i am planning to use supabase bucket for image storage
        .notEmpty()
        .withMessage("Profile image tidak boleh kosong")
        .isString()
        .withMessage("Profile image harus berupa string"),
    (0, express_validator_1.body)("password")
        .optional()
        // .withMessage("Tidak boleh string kosong")
        .notEmpty()
        .withMessage("Password tidak boleh kosong")
        .isLength({ min: 8 })
        .withMessage("Password harus minimal 8 karakter panjangnya")
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        .withMessage("Password harus mengandung setidaknya 1 huruf besar, 1 angka, dan 1 karakter khusus"),
    validate_1.validate,
];
