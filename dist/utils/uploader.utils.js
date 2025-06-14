"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToSupabase = uploadImageToSupabase;
exports.uploadDocumentToSupabase = uploadDocumentToSupabase;
const supabase_configs_1 = require("../configs/supabase.configs");
function uploadImageToSupabase(file, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_configs_1.supabase.storage
            .from("profile-image") // supabase bucket name
            .upload(path, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });
        if (error)
            throw error;
        return data;
    });
}
function uploadDocumentToSupabase(file, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_configs_1.supabase.storage
            .from("resume") // supabase bucket name
            .upload(path, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });
        if (error)
            throw error;
        return data;
    });
}
