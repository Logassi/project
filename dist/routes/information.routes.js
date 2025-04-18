"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const information_controllers_1 = require("../controllers/information.controllers");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const router = (0, express_1.Router)();
router.get("/banner", 
// Di deskripsi swagger, dikatakan [API Banner Public (tidak memerlukan Token untuk mengaksesnya)]
// tapi bagian response di swagger ada kasus 401 Unauthorized
// jadi jika memang memerlukan token, uncomment middleware VerifyToken
// VerifyToken, // middleware untuk verifikasi token
information_controllers_1.GetBanner);
router.get("/services", authorization_middleware_1.VerifyToken, information_controllers_1.GetService);
exports.default = router;
