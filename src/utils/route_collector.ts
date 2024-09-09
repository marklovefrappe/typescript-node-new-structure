import fs from "fs";
import express from "express";

export type ControllerAdapter = (
  req: express.Request,
  res: express.Response,
) => Promise<never>;

export type Route = {
  method: "get" | "post" | "patch" | "delete";
  path: string;
  configs?: {
    auth: string;
    scopes: string[];
    limiter?: {
      max: number;
      windowMs: number;
    };
  };
  handler: ControllerAdapter;
};
const createRouteCollector = (
  dirname: string,
  initialRoutes: Route[] = [],
): (() => Promise<Route[]>) => {
  // create collector
  const routesCollector = async (): Promise<Route[]> => {
    const routes: Route[] = initialRoutes;

    const filenames: string[] = await new Promise((resolve, reject) => {
      fs.readdir(dirname, (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });

    console.log(filenames);

    for (const filename of filenames) {
      let moduleName = "";
      let _routes: Route[] = [];

      // import directory module
      if (!filename.includes(".")) {
        moduleName = filename;
        const m = await import(`${dirname}/${moduleName}`);
        _routes = await m.default();
      }

      // import file module
      if (
        (filename.includes(".js") || filename.includes(".ts")) &&
        !filename.includes(".map") &&
        !filename.includes("index")
      ) {
        moduleName = filename.slice(0, -3); // remove .js
        const m = await import(`${dirname}/${moduleName}`);
        _routes = m.default;
      }

      console.log(moduleName);
      console.log(_routes);

      // prefixing route
      // if (moduleName && _routes.length > 0) {
      //     for (const r of _routes) {
      //         r.path = `/${moduleName}${r.path}`;
      //         routes.push(r);
      //     }
      // }
    }

    return routes;
  };

  return routesCollector;
};

export default createRouteCollector;
