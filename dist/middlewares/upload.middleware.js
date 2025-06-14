"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocument = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Format file harus JPG atau PNG"));
    }
    cb(null, true);
};
const fileFilterDocument = (req, file, cb) => {
    const allowedMimeTypes = ["application/doc", "application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Format file harus .docs atau .pdf"));
    }
    cb(null, true);
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
});
exports.uploadDocument = (0, multer_1.default)({
    storage,
    fileFilter: fileFilterDocument,
});
