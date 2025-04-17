import { Router } from "express";
import {
  GetProfile,
  Login,
  Register,
  Update,
  UpdateImage,
} from "../controllers/membership.controllers";
import { VerifyToken } from "../middlewares/authorization.middleware";
import {
  LoginValidation,
  RegisterValidation,
  UpdateValidation,
} from "../middlewares/validations/membership.validations";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post(
  "/register",
  RegisterValidation, //validation
  Register //controller
);

router.post(
  "/login",
  LoginValidation, //validation
  Login //controller
);

router.put(
  "/profile/update",
  VerifyToken,
  UpdateValidation,
  Update //controller
);

router.put("/profile/image", VerifyToken, upload.single("image"), UpdateImage);

router.get(
  "/profile",
  VerifyToken,
  //validation
  GetProfile //controller
);

export default router;
