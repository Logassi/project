"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const env_configs_1 = require("./configs/env.configs");
const PORT = env_configs_1.PORT || 8000;
server_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
