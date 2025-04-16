import { Router } from "express";
import { GetBanner } from "../controllers/information.controllers";

const router = Router();

router.get(
  "/banner",
  //validation,
  GetBanner
);

export default router;
