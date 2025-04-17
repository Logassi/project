import multer from "multer";

const storage = multer.memoryStorage(); // We'll upload buffer directly to Supabase
export const upload = multer({ storage });
