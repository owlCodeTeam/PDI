import { Body, Controller, HttpStatus, Param, Post, Res, Get } from "@nestjs/common";
import { AuthLoginDto } from "./authLogin.dto";
import { ApiTags } from "@nestjs/swagger";
import { GenerateTokenUsecase } from "@domain/auth/usecase/generateToken.usecase";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";
import { AuthSaveDto } from "./authSave.dto";
import { saveUserUsecase } from "@domain/user/usecases/save.usecase";
import { emailGatewayLocal } from "@infra/user/emailGateway.gateway";
import { PasswordrecoveryDto } from "./passwordRecovery.dto";
import { passwordRecoveryUsecase } from "@domain/auth/usecase/passwordRecovery.usecase";
import { verifyAccountUsecase } from "@domain/auth/usecase/verifyAccount.usecase";
@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(
    readonly repo: AuthRepositoryTypeorm,
    readonly gateway: AuthGatewayLocal,
    readonly emailGateway: emailGatewayLocal,
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
      response.status(HttpStatus.PRECONDITION_FAILED).send({
        message: error.message,
      });
    }
  }
  @Post("signUp")
  async save(@Body() body: AuthSaveDto, @Res() response) {
    try {
      const usecase = new saveUserUsecase(this.repo, this.gateway, this.emailGateway);
      const user = await usecase.execute(body);
      if (user.is_verify() === true) {
        response.status(HttpStatus.OK).send({
          message: "Usuario cadastrado com sucesso",
          user: user.props,
        });
      }
      response.status(HttpStatus.OK).send({
        message: "Usuario cadastrado com sucesso",
        user: user.props,
      });
    } catch (error) {
      response.status(HttpStatus.PRECONDITION_FAILED).send({
        message: error.message,
      });
    }
  }
  @Get("send/token/:email")
  async ResendToken(@Param("email") email: string, @Res() response) {
    try {
      const usecase = new GenerateTokenUsecase(this.repo, this.gateway);
      const token = await usecase.execute({
        username: email,
      });
      response.status(HttpStatus.OK).send({
        message: "token gerado com sucesso",
        token,
      });
    } catch (error) {
      response.status(HttpStatus.PRECONDITION_FAILED).send({
        message: error.message,
      });
    }
  }
  @Post("password/recovery")
  async passwordRecovery(@Body() body: PasswordrecoveryDto, @Res() response) {
    try {
      const usecase = new passwordRecoveryUsecase(this.repo, this.gateway);
      const user = await usecase.execute(body);
      response.status(HttpStatus.OK).send({
        message: "Senha alterada com sucesso",
        user,
      });
    } catch (error) {
      response.status(HttpStatus.PRECONDITION_FAILED).send({
        message: error.message,
      });
    }
  }
  @Get("verify/account/:token")
  async verifyAccount(@Param("token") token: string, @Res() response) {
    try {
      const verifyAccount = new verifyAccountUsecase(this.repo, this.gateway);
      await verifyAccount.execute(token);
      response.status(HttpStatus.OK).send({
        message: "Conta verificada com sucesso",
      });
    } catch (error) {
      response.status(HttpStatus.PRECONDITION_FAILED).send({
        message: error.message,
      });
    }
  }
}
