import { Router } from "express";
import { GetProfile } from "../controllers/membership.controllers";

const router = Router();

router.get(
  "/profile",
  //validation,
  GetProfile
);

export default router;
