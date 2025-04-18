import { Router } from "express";
import {
  GetBalance,
  GetTransactionHistory,
  PostTransaction,
  TopUp,
} from "../controllers/transaction.controllers";
import { VerifyToken } from "../middlewares/authorization.middleware";
import {
  CreateTransactionValidation,
  TopUpValidation,
} from "../middlewares/validations/transaction.validation";

const router = Router();

router.get(
  "/balance",
  VerifyToken,

  GetBalance
);

router.post("/topup", VerifyToken, TopUpValidation, TopUp);

router.post(
  "/transaction",
  VerifyToken,
  CreateTransactionValidation,
  PostTransaction // user must have a balance to make a transaction
);

router.get("/transaction/history", VerifyToken, GetTransactionHistory);

export default router;
