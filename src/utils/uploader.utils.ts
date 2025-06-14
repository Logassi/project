import { supabase } from "../configs/supabase.configs";

export async function uploadImageToSupabase(
  file: Express.Multer.File,
  path: string
) {
  const { data, error } = await supabase.storage
    .from("profile-image") // supabase bucket name
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw error;

  return data;
}

export async function uploadDocumentToSupabase(
  file: Express.Multer.File,
  path: string
) {
  const { data, error } = await supabase.storage
    .from("resume") // supabase bucket name
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw error;

  return data;
}
