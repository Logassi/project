"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membership_routes_1 = __importDefault(require("./routes/membership.routes"));
const information_routes_1 = __importDefault(require("./routes/information.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = (0, express_1.default)();
// app.use(
//   cors({
//     origin: BASE_WEB_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use(express_1.default.json());
app.use("/", membership_routes_1.default);
app.use("/", information_routes_1.default);
app.use("/", transaction_routes_1.default);
app.use(error_middleware_1.default);
exports.default = app;
