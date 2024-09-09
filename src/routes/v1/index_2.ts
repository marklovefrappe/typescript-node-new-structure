import express from "express";
import createRouteCollector from "../../utils/route_collector";

const routesCollector = createRouteCollector(__dirname, [
  {
    method: "get",
    path: "/status",
    handler: async (req: express.Request, res: express.Response) => {
      res.json({ msg: "ok" });
    },
  },
]);
export default routesCollector;
