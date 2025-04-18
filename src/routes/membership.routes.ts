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

router.post("/register", RegisterValidation, Register);

router.post("/login", LoginValidation, Login);

router.put("/profile/update", VerifyToken, UpdateValidation, Update);

router.put("/profile/image", VerifyToken, upload.single("image"), UpdateImage);

router.get("/profile", VerifyToken, GetProfile);

export default router;
