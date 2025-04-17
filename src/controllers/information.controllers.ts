import { Request, Response, NextFunction } from "express";
import { getBanner, getService } from "../services/information.services";

async function GetBanner(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await getBanner();

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function GetService(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await getService();

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export { GetBanner, GetService };
