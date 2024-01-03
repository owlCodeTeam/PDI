import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthLoginDto } from "./authLogin.dto";
import { ApiTags } from "@nestjs/swagger";
import { GenerateTokenUsecase } from "@domain/auth/usecase/generateToken.usecase";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";

@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(
    readonly repo: AuthRepositoryTypeorm,
    readonly gateway: AuthGatewayLocal,
  ) {}

  @Post("token-generate")
  async tokenGenerate(@Body() body: AuthLoginDto, @Res() response) {
    try {
      const usecase = new GenerateTokenUsecase(this.repo, this.gateway);
      const token = await usecase.execute({
        username: body.username,
        password: body.password,
      });
      response.status(HttpStatus.OK).send({
        message: "token gerado com sucesso",
        token,
      });
    } catch (error) {
      response.status(HttpStatus.PRECONDITION_FAILED).send(error);
    }
  }
}
