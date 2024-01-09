import { MessageEntity } from "@domain/chat/entity/message.entity";
import { getMessagesUsecase } from "@domain/chat/usecase/getMessages.usecase";
import { QuerychatRepository } from "@infra/chat/database/QueryChatReposiotry.query";
import { chatRepositoryOrm } from "@infra/chat/database/chatRepository.typeorm";
import dataSource from "@infra/shared/database/datasource";

describe("Deve testar o getMessagesUsecase", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource.destroy();
  });
  test("Deve receber as mensagens do remetente e destinatario", async () => {
    const repo = new chatRepositoryOrm(dataSource);
    const query = new QuerychatRepository(dataSource);
    const action = new getMessagesUsecase(repo, query);
    const input = {
      receiver: "018979ce-6b9e-403a-adcb-3fb537c67b16",
      sender: "018979ce-6b9e-403a-adcb-3fb537c67b16",
    };
    const messages = await action.execute(input);
    expect(messages.every((message) => message instanceof MessageEntity)).toBe(true);
  });
});
