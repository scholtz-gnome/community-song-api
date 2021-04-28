import config from "../config";
import { newApp } from "./app";
import * as http from "http";

const app = newApp();
const env = config.NODE_ENV;

http.createServer({}, app).listen(config.PORT, () => {
  console.log(`API running on port ${config.PORT} in ${env} environment`);
});
