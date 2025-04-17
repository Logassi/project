"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controllers_1 = require("../controllers/transaction.controllers");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const transaction_validation_1 = require("../middlewares/validations/transaction.validation");
const router = (0, express_1.Router)();
router.get("/balance", authorization_middleware_1.VerifyToken, 
//validation,
transaction_controllers_1.GetBalance);
router.post("/topup", authorization_middleware_1.VerifyToken, transaction_validation_1.TopUpValidation, // validation
transaction_controllers_1.TopUp);
router.post("/transaction", authorization_middleware_1.VerifyToken, transaction_validation_1.CreateTransactionValidation, transaction_controllers_1.PostTransaction // user must have a balance to make a transaction
);
router.get("/transaction/history", authorization_middleware_1.VerifyToken, 
//validation
transaction_controllers_1.GetTransactionHistory);
exports.default = router;
