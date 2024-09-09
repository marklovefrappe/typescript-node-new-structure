import express from "express";
import appMiddleware from "./app.middleware";
import routeVersion1 from "./route_v1.middleware";
import routeVeresion2 from "./route_v2.middleware";
import errorMiddleware from "./error.middleware";

const boot = (server: express.Express): void => {
  appMiddleware(server);
  routeVersion1(server);
  routeVeresion2(server);
  errorMiddleware(server);
};

export default boot;
