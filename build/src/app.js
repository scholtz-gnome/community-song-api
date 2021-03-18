"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
function newApp() {
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get("/", (_, res) => {
        res.send("Hello from the backend!");
    });
    return app;
}
exports.newApp = newApp;
