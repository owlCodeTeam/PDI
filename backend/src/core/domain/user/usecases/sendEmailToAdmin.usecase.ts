import { emailGatewayInterface } from "../emailGateway.interface";

export class SendEmailToAdmin {
  constructor(readonly emailGateway: emailGatewayInterface) {}
  public async execute(emails: string[]) {
    for (const email in emails) {
      const emailContent = {
        from: process.env.EMAILADMIN,
        to: email,
        subject: "Erro na API do projeto de PDI",
        text: "Ocorreu um erro no servidor da api que a fez falhar, o erro ocorreu em: " + Date.now(),
      };
      await this.emailGateway.send(emailContent);
    }
  }
}
