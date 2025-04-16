import { Request, Response, NextFunction } from "express";

async function GetBalance(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({
      status: 200,
      message: "Get Balance Berhasil",
      data: {
        balance: 100000,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

export { GetBalance };
