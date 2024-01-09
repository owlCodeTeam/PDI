import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { messageModel } from "../models/Message.model";

export class ChatSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repo = dataSource.getRepository(messageModel);
    await repo.createQueryBuilder("chat_messages").delete().execute();
    const messages = [
      {
        uuid: "013b6d7a-eb0e-42ee-9918-8335a82f1fd9",
        message: "ola",
        sender: "testeUser",
        receiver: "receiver teste",
      },
      {
        uuid: "023b6d7a-eb0e-42ee-9918-8335a82f1fd9",
        message: "ola",
        sender: "testeUser",
        receiver: "receiver teste",
      },
    ];
    await repo.insert(messages);
  }
}
