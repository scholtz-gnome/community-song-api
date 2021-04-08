import { newApp } from "./app";
import * as http from "http";
import config from "../config";

const app = newApp();
const port: string = config.PORT || "4000";
const env = config.NODE_ENV;

http.createServer({}, app).listen(port, () => {
  console.log(`API running on port ${port} in ${env} environment`);
});
