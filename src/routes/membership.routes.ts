import { Router } from "express";
import {
  GetProfile,
  Login,
  Register,
  Update,
} from "../controllers/membership.controllers";
import { VerifyToken } from "../middlewares/authorization.middleware";

const router = Router();

router.post(
  "/register",
  //validation,
  Register //controller
);

router.post(
  "/login",
  //validation,
  Login //controller
);

router.put(
  "/update",
  VerifyToken,
  //validation
  Update //controller
);

router.get(
  "/profile",
  VerifyToken,
  //validation
  GetProfile //controller
);

export default router;
