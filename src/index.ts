import { createServer, listenServer } from "./utils/server";
import boot from "./middlewares/middleware";

const startServer = () => {
  const server = createServer();
  boot(server);
  listenServer(server);
};

startServer();

export default startServer;
