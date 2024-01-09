import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { SocketIoGateway } from "@infra/socket/socket.gateway";
import * as http from "http";
import { Server } from "socket.io";
import { chatRepositoryOrm } from "@infra/chat/database/chatRepository.typeorm";
import { DataSource } from "typeorm";
import { getDataSourceToken } from "@nestjs/typeorm";
import { QuerychatRepository } from "@infra/chat/database/QueryChatReposiotry.query";

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [
    {
      provide: chatRepositoryOrm,
      useFactory: (dataSource: DataSource) => {
        return new chatRepositoryOrm(dataSource);
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
    {
      provide: QuerychatRepository,
      useFactory: (dataSource: DataSource) => {
        return new QuerychatRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    },
  ],
})
export class ChatModule {}
