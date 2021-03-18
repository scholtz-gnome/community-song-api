import { newApp } from "./app";
import * as http from "http";
import { config } from "../config";

const app = newApp();
const port: string = config.PORT || "4000";

http.createServer({}, app).listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
