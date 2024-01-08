import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { DataSource } from "typeorm";
import { getDataSourceToken } from "@nestjs/typeorm";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";
import { emailGatewayLocal } from "@infra/user/emailGateway.gateway";
import { socketIoGateway } from "@infra/socket/socket.gateway";
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
      provide: socketIoGateway,
      useFactory: () => {
        return new socketIoGateway();
      },
    },
  ],
})
export class AuthModule {}
