import express from "express";

export default (server: express.Express) => {
  // Config express middleware
  server.use(express.static("static"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
};
