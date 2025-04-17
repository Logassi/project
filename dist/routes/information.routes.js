"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const information_controllers_1 = require("../controllers/information.controllers");
const router = (0, express_1.Router)();
router.get("/banner", 
//validation,
information_controllers_1.GetBanner);
router.get("/services", 
//validation,
information_controllers_1.GetService);
exports.default = router;
