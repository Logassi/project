import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../configs/env.configs";

const prisma = new PrismaClient();

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, first_name, last_name, password } = req.body;

    const findUserEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUserEmail) throw new HttpError(400, "Bad Request");

    const salt = await genSalt(10);
    const hashingPassword = await hash(password, salt);

    await prisma.$transaction(async (prisma) => {
      await prisma.user.create({
        data: {
          email,
          first_name,
          last_name,
          password: hashingPassword,
        },
      });
    });

    res.status(201).json({
      status: 201,
      message: "Registrasi berhasil silahkan login",
      data: null,
      //   data: {
      //     email,
      //     first_name,
      //     last_name,
      //     hashingPassword,
      //   },
    });
  } catch (error) {
    // console.error("Error during registration:", error);
    next(error);
  }
}

async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) throw new HttpError(401, "Unauthorized");

    // password minimal 8
    const isValid = await compare(password, findUser.password);

    if (!isValid) throw new HttpError(401, "Unauthorized");

    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
    };

    const token = sign(payload, SECRET_KEY as string);

    res.status(200).json({
      status: 200,
      message: "Login Sukses",
      //   data: null,
      data: {
        token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
}

async function GetProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user?.email,
      },
    });

    // i dont think this is needed, because we already check in authorization middleware
    // if (!user) throw new HttpError(404, "User not found");

    res.status(200).json({
      status: 200,
      message: "Sukses",
      data: {
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
        profile_image: user?.profile_image,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

async function Update(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, first_name, last_name, profile_image } = req.body;

    const findUser = await prisma.user.findUnique({
      where: {
        email: req.user?.email,
      },
    });

    if (!findUser) throw new HttpError(404, "User not found");

    const updatedUser = await prisma.user.update({
      where: {
        email: req.user?.email,
      },
      data: {
        email,
        first_name,
        last_name,
        profile_image,
      },
    });

    res.status(200).json({
      status: 200,
      message: "Update Profile Berhasil",
      data: {
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        profile_image: updatedUser.profile_image,
      },
    });
  } catch (error) {
    console.error("Error during update profile:", error);
    next(error);
  }
}

export { Register, Login, GetProfile, Update };
