"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const knexfile = require("../knexfile");
const knex_1 = __importDefault(require("knex"));
const environment = config_1.config.NODE_ENV || "development";
const dbConnection = knexfile[environment];
exports.default = knex_1.default(dbConnection);
