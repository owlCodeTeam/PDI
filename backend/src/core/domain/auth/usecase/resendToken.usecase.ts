import { emailGatewayInterface } from "@domain/user/emailGateway.interface";
import { authGatewayInterface } from "../authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";
export class ResendTokenUsecase {
  constructor(
    readonly repo: AuthRepositoryInterface,
    readonly gateway: authGatewayInterface,
    readonly emailGateway?: emailGatewayInterface,
  ) {}
  public async execute(email: string): Promise<string> {
    const user = await this.repo.getByUsername(email);
    if (user) {
      const token = await this.gateway.tokenGenerate(user);
      const emailContent = {
        from: process.env.EMAILADMIN,
        to: user.email(),
        subject: "Verificação de conta",
        text: "Clique no botão abaixo e será redirecionado para o site.",
        html: `<a href='http://localhost:9000/#/verify-account/${user.email}/${token}'><button style='font-size: 16px; font-weight: 600; padding: 1vh 1vw; cursor: pointer;border-radius: 1vh; color: #fff; background-color: #303f9f; border: none;'>Clique aqui!</button></a>`,
      };
      await this.emailGateway.send(emailContent);
      return token;
    }
    return;
  }
}
