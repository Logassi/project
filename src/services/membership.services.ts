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

const prisma = new PrismaClient();

export async function registerUser(userInput: RegisterUserInput) {
  const { email, first_name, last_name, password } = userInput;

  const findUserEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (findUserEmail) {
    console.log("Register failed : Bad request");
    throw new HttpError(400, "Bad Request");
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

  if (!findUser) throw new HttpError(401, "Username atau password salah");

  // password minimal 8
  const isValid = await compare(password, findUser.password);

  if (!isValid) throw new HttpError(401, "Username atau password salah");

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
