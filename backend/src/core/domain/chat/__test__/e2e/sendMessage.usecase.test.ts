import { MessageEntity } from "@domain/chat/entity/message.entity";
import { userEntity } from "@domain/chat/entity/user.entity";
import { chatRepositoryOrm } from "@infra/chat/database/chatRepository.typeorm";
import dataSource from "@infra/shared/database/datasource";
import { SocketIoGateway } from "@infra/socket/socket.gateway";
import * as crypto from "crypto";

describe("Deve testar o sendMessageUsecase", () => {
  test.skip("Deve enviar uma mensagem do remetente ao destinatario", async () => {
    const repo = new chatRepositoryOrm(dataSource);
    const socket = new SocketIoGateway()
    const sender = new userEntity({
      name: "joe",
      email: "joe@gmail",
      uuid: crypto.randomBytes(8).toString("hex"),
    });
    const receiver = new userEntity({
      name: "kiko",
      email: "kiko@gmail",
      uuid: crypto.randomBytes(8).toString("hex"),
    });
    const message = new MessageEntity({
      Message: "Bom dia",
      Message_reciever: receiver,
      Message_sender: sender,
      uuid: crypto.randomBytes(8).toString("hex"),
    });
  });
  const action = new 
});
