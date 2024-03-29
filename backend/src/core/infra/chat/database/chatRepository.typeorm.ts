import { chatRepositoryInterface } from "@domain/chat/chatRepository.interface";
import { DataSource } from "typeorm";
import { messageModel } from "./models/Message.model";
import { MessageEntity } from "@domain/chat/entity/message.entity";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
import { userEntity } from "@domain/chat/entity/user.entity";
import { UserModel } from "@infra/auth/database/models/User.model";
import { isUUID } from "class-validator";

export class chatRepositoryOrm implements chatRepositoryInterface {
  constructor(readonly dataSource: DataSource) {}
  async sendMessage(message: MessageEntity): Promise<void> {
    try {
      this.dataSource
        .createQueryBuilder()
        .insert()
        .into(messageModel)
        .values([
          {
            uuid: message.uuid(),
            message: message.Message(),
            receiver: message.Message_reciever().uuid(),
            sender: message.Message_sender().uuid(),
          },
        ])
        .execute();
    } catch (error) {
      throw new apiError("Erro enquanto salvava a mensagem" + error, 500, "internal_server_error");
    }
  }
  async getUserByUuid(uuid: string): Promise<userEntity> {
    if (!isUUID(uuid)) {
      throw new apiError(`Usuario com id igual a ${uuid} não existe no banco de dados`, 404, "invalid_uuid");
    }
    const userModel = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid: uuid })
      .getOne();

    if (!userModel) {
      return;
    }

    const user = new userEntity({
      uuid: userModel.uuid,
      name: userModel.name,
      email: userModel.email,
    });

    return user;
  }
}
