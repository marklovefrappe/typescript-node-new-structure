import express from "express";
import registerUser from "../routes/v1/user.route";
import registerAuth from "../routes/v1/auth.route";

export default (server: express.Express) => {
  // Apply all route
  const router = express.Router();

  // Regist route
  registerUser(router);
  registerAuth(router);

  // Adding route middleware
  server.use("/v1", router);
};
