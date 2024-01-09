import { SocketIoGateway } from "@infra/socket/socket.gateway";
import * as http from "http";
import { Server } from "socket.io";
describe("Testar socket", () => {
  test("deve mandar uma mensagem", async () => {
    const server = http.createServer();
    const io: Server = new Server(server, {
      cors: {
        origin: "http://localhost:9000",
      },
    });
    const socket = new SocketIoGateway(io);
    await socket.connect();
    expect(1).toBe(1);
  });
});
