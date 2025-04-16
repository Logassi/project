import { Request, Response, NextFunction } from "express";

async function GetBanner(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({
      status: 200,
      message: "Test Success",
      data: [
        {
          banner_name: "Banner 1",
          banner_image: "https://example.com/banner1.jpg",
          description: "Test Banner 1 description",
        },
        {
          banner_name: "Banner 2",
          banner_image: "https://example.com/banner1.jpg",
          description: "Test Banner 2 description",
        },
        {
          banner_name: "Banner 3",
          banner_image: "https://example.com/banner1.jpg",
          description: "Test Banner 3 description",
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

export { GetBanner };
