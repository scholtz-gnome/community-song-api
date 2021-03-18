"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV || "test",
};
