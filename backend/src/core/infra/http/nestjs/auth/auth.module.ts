import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { DataSource } from "typeorm";
import { getDataSourceToken } from "@nestjs/typeorm";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";
import { emailGatewayLocal } from "@infra/user/emailGateway.gateway";
import { SocketIoGateway } from "@infra/socket/socket.gateway";
import * as http from "http";
import { Server } from "socket.io";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthRepositoryTypeorm,
      useFactory: (dataSource: DataSource) => {
        return new AuthRepositoryTypeorm(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: AuthGatewayLocal,
      useFactory: (dataSource: DataSource) => {
        return new AuthGatewayLocal(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: emailGatewayLocal,
      useFactory: () => {
        return new emailGatewayLocal();
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: SocketIoGateway,
      useFactory: () => {
        const server = http.createServer();
        const io: Server = new Server(server, {
          cors: {
            origin: "http://localhost:9000",
          },
        });
        io.listen(4000);
        return new SocketIoGateway(io);
      },
    },
  ],
})
export class AuthModule {}
