import { Request, Response, NextFunction } from "express";
import {
  createTransaction,
  getBalance,
  getTransactionHistory,
  recordTopUpTransaction,
  topUp,
} from "../services/transaction.services";
import { HttpError } from "../utils/http.error";

async function GetBalance(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.email) {
      throw new HttpError(401, "Unauthorized");
    }

    const balance = await getBalance(req.user?.email);

    res.status(200).json({
      status: 200,
      message: "Get Balance Berhasil",
      data: {
        balance,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function GetTransactionHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.email) {
      throw new HttpError(401, "Unauthorized");
    }

    const offset = parseInt(req.query.offset as string) || 0;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const transactionHistory = await getTransactionHistory(
      offset,
      skip,
      limit,
      req.user?.email
    );

    res.status(200).json({
      status: 200,
      message: "Get History  Berhasil",
      data: transactionHistory,
    });
  } catch (error) {
    next(error);
  }
}

async function TopUp(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.email) {
      throw new HttpError(401, "Unauthorized");
    }

    const { top_up_amount } = req.body;

    await topUp(top_up_amount, req.user?.email);

    const recordedTopUp = await recordTopUpTransaction(
      req.user?.email,
      top_up_amount
    );

    // console.log(recordedTopUp);

    const finalBalance = await getBalance(req.user?.email);

    res.status(200).json({
      status: 200,
      message: "Top Up Balance berhasil",
      data: finalBalance,
    });
  } catch (error) {
    next(error);
  }
}

async function PostTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.email) {
      throw new HttpError(401, "Unauthorized");
    }

    const { service_code } = req.body;

    const transaction = await createTransaction(service_code, req.user?.email);

    res.status(200).json({
      status: 200,
      message: "Transaksi berhasil",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

export { GetBalance, GetTransactionHistory, TopUp, PostTransaction };
