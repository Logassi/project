import { body } from "express-validator";
import { validate } from "./validate";

export const TopUpValidation = [
  body("top_up_amount")
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

  validate,
];

export const CreateTransactionValidation = [
  body("service_code")
    .notEmpty()
    .withMessage("Service code harus diisi")
    .isString()
    .withMessage("Service code harus berupa string"),

  validate,
];
