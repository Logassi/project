import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Format file harus JPG atau PNG"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
});
