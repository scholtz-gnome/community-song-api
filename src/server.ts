import config from "../config";
import app from "./app";
import * as http from "http";

// const app = newApp();

http.createServer({}, app).listen(config.PORT, () => {
  console.log(
    `API: running on port ${config.PORT} in ${config.NODE_ENV} environment`
  );
});
