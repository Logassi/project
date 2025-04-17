"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const membership_controllers_1 = require("../controllers/membership.controllers");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const membership_validations_1 = require("../middlewares/validations/membership.validations");
const router = (0, express_1.Router)();
router.post("/register", membership_validations_1.RegisterValidation, //validation
membership_controllers_1.Register //controller
);
router.post("/login", membership_validations_1.LoginValidation, //validation
membership_controllers_1.Login //controller
);
router.put("/profile/update", authorization_middleware_1.VerifyToken, membership_validations_1.UpdateValidation, membership_controllers_1.Update //controller
);
router.put("/profile/image", authorization_middleware_1.VerifyToken
//validation
//   UpdateImage //controller
);
router.get("/profile", authorization_middleware_1.VerifyToken, 
//validation
membership_controllers_1.GetProfile //controller
);
exports.default = router;
