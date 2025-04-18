import { PrismaClient } from "@prisma/client";
import { compare, genSalt } from "bcrypt";
import { hash } from "bcrypt";
import { HttpError } from "../utils/http.error";
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateUserInput,
} from "../types/membership.types";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../configs/env.configs";
import { supabase } from "../configs/supabase.configs";

const prisma = new PrismaClient();

export async function registerUser(userInput: RegisterUserInput) {
  const { email, first_name, last_name, password } = userInput;

  const findUserEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // for user friendly error message
  // if (findUserEmail) {
  //   throw new HttpError(409, "Email sudah digunakan");
  // }

  // for security reason, when don't want to expose if the email is already registered or not
  if (findUserEmail) {
    throw new HttpError(400, "Registrasi gagal. Silakan periksa data Anda.");
  }

  const salt = await genSalt(10);
  const hashingPassword = await hash(password, salt);

  await prisma.user.create({
    data: {
      email,
      first_name,
      last_name,
      password: hashingPassword,
    },
  });
}

export async function loginUser(userInput: LoginUserInput) {
  const { email, password } = userInput;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) throw new HttpError(401, "Email atau password salah");

  const isValid = await compare(password, findUser.password);

  if (!isValid) throw new HttpError(401, "Email atau password salah");

  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // 12 hours
  };

  const token = sign(payload, SECRET_KEY as string);
  return token;
}

export async function getUserProfile(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function updateUser(email: string, userInput: UpdateUserInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError(404, "User not found");

  return await prisma.user.update({
    where: { email },
    data: userInput,
  });
}

export async function updateUserImage(email: string, image: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError(404, "User not found");

  const updatedUserImage = await prisma.user.update({
    where: { email },
    data: {
      profile_image: image,
    },
  });

  return {
    email: updatedUserImage.email,
    first_name: updatedUserImage.first_name,
    last_name: updatedUserImage.last_name,
    profile_image: updatedUserImage.profile_image,
  };
}

export async function getOldProfileImageUrl(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { profile_image: true },
  });
  return user?.profile_image; // Return the old image URL
}

export async function deleteOldProfileImage(oldImageUrl: string) {
  const filePath = oldImageUrl.split("/profile-image/")[1];

  const { error } = await supabase.storage
    .from("profile-image")
    .remove([filePath]);

  if (error) {
    throw new HttpError(500, "Failed to delete old profile image");
  }
}
