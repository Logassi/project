import { Router } from "express";
import { GetBanner, GetService } from "../controllers/information.controllers";
import { VerifyToken } from "../middlewares/authorization.middleware";

const router = Router();

router.get(
  "/banner",
  // Di deskripsi swagger, dikatakan [API Banner Public (tidak memerlukan Token untuk mengaksesnya)]
  // tapi bagian response di swagger ada kasus 401 Unauthorized
  // jadi jika memang memerlukan token, uncomment middleware VerifyToken
  // VerifyToken, // middleware untuk verifikasi token
  GetBanner
);

router.get("/services", VerifyToken, GetService);

export default router;
