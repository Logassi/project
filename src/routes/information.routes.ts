import { Router } from "express";
import { GetBanner, GetService } from "../controllers/information.controllers";

const router = Router();

router.get(
  "/banner",
  //validation,
  GetBanner
);

router.get(
  "/services",
  //validation,
  GetService
);

export default router;
