import { Router } from "express";
import { GetBalance } from "../controllers/transaction.controllers";

const router = Router();

router.get(
  "/balance",
  //validation,
  GetBalance
);

export default router;
