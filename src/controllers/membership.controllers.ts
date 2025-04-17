import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../configs/env.configs";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUser,
} from "../services/membership.services";

const prisma = new PrismaClient();

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await loginUser(req.body);

    res.status(200).json({
      status: 200,
      message: "Login Sukses",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function GetProfile(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.email) {
      throw new HttpError(401, "Unauthorized");
    }

    const user = await getUserProfile(req.user?.email);

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
    if (!req.user?.email) {
      throw new HttpError(401, "Unauthorized");
    }
    const updatedUser = await updateUser(req.user?.email, req.body);

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
    next(error);
  }
}

export { Register, Login, GetProfile, Update };
