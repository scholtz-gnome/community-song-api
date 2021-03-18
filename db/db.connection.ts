import { config } from "../config";
const knexfile = require("../knexfile");
import knex from "knex";
const environment = config.NODE_ENV || "development";
const dbConnection = knexfile[environment];

export default knex(dbConnection);
