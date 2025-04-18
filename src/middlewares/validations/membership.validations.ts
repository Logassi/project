import { body } from "express-validator";
import { validate } from "./validate";

export const RegisterValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Parameter email tidak sesuai format"),
  // .custom((value) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(value)) {
  //     throw { msg: "Parameter email tidak sesuai format", code: 102 };
  //   }
  //   return true;
  // }),

  body("first_name")
    .notEmpty()
    .withMessage("First name harus diisi")
    .isString()
    .withMessage("First name harus string"),

  body("last_name")
    .notEmpty()
    .withMessage("Last name diisi")
    .isString()
    .withMessage("Last name harus string"),

  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 8 })
    .withMessage("Password harus minimal 8 karakter panjangnya")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    .withMessage(
      "Password harus mengandung setidaknya 1 huruf besar, 1 angka, dan 1 karakter khusus"
    ),

  validate,
];

export const LoginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Parameter email tidak sesuai format"),

  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 8 })
    .withMessage("Password harus minimal 8 karakter panjangnya"),

  validate,
];

export const UpdateValidation = [
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email tidak boleh kosong")
    .isEmail()
    .withMessage("Parameter email tidak sesuai format"),

  body("first_name")
    .optional()
    .notEmpty()
    .withMessage("First name tidak boleh kosong")
    .isString()
    .withMessage("First name harus berupa string"),

  body("last_name")
    .optional()
    .notEmpty()
    .withMessage("Last name tidak boleh kosong")
    .isString()
    .withMessage("Last name harus berupa string"),

  body("profile_image")
    .optional()
    .notEmpty()
    .withMessage("Profile image tidak boleh kosong")
    .isString()
    .withMessage("Profile image harus berupa string"),

  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password tidak boleh kosong")
    .isLength({ min: 8 })
    .withMessage("Password harus minimal 8 karakter panjangnya")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    .withMessage(
      "Password harus mengandung setidaknya 1 huruf besar, 1 angka, dan 1 karakter khusus"
    ),

  validate,
];
