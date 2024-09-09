import express from "express";
import verifyTokenMiddleware from "../../middlewares/verify_token.middleware";
import * as authHandler from "../../controllers/auth.controller";

export default (router: express.Router) => {
  router.post("/api/users/token/request", authHandler.requestToken);
  router.post(
    "/api/users/token/refresh",
    verifyTokenMiddleware,
    authHandler.refreshToken,
  );
  router.post(
    "/api/users/token/revoke",
    verifyTokenMiddleware,
    authHandler.revokeToken,
  );
};
