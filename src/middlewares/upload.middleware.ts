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

const fileFilterDocument = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ["application/doc", "application/pdf"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Format file harus .docs atau .pdf"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
});

export const uploadDocument = multer({
  storage,
  fileFilter: fileFilterDocument,
});
