import { Request, Response, NextFunction } from "express";

async function GetProfile(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({
      message: "Test Success",
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

export { GetProfile };
