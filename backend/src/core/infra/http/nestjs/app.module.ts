import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModel } from "@infra/auth/database/models/User.model";
import { CompanyModel } from "@infra/auth/database/models/Company.model";
import { ChatModule } from "./Chat/chat.module";
import { messageModel } from "@infra/chat/database/models/Message.model";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "host.docker.internal",
      port: 5433,
      username: "root",
      password: "root",
      database: "pdi",
      entities: [UserModel, CompanyModel, messageModel],
      synchronize: false,
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
