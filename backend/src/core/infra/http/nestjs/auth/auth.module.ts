import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { DataSource } from "typeorm";
import { getDataSourceToken } from "@nestjs/typeorm";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";

@Module({
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
  ],
})
export class AuthModule {}
