import { socketIoGateway } from "@infra/socket/socket.gateway";
import * as http from "http";
import { Server } from "socket.io";
describe("Testar socket", () => {
  test("deve mandar uma mensagem", () => {
    const server = http.createServer();
    const io: Server = new Server(server, {
      cors: {
        origin: "http://localhost:9000",
      },
    });
    io.listen(4000);
    const socket = new socketIoGateway(io);
    socket.handleMessage("da certo pfv");
    expect(1).toBe(1);
  });
});
