import express from "express";
import * as userHandler from "../../controllers/user.controller";

export default (router: express.Router) => {
  router.post("/api/users/create", userHandler.createUser);
  router.patch("/api/users/verify/:id", userHandler.verifyUser);
  router.post(
    "/api/users/forgetpassword/request",
    userHandler.requestForgetPassword,
  );
  router.post(
    "/api/users/forgetpassword/confirm",
    userHandler.confirmForgetPassword,
  );
};
