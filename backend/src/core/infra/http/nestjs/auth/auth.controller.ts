import { Body, Controller, HttpStatus, Param, Post, Res, Get, Patch } from "@nestjs/common";
// import { AuthLoginDto } from "./authLogin.dto";
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
import { ResendTokenUsecase } from "@domain/auth/usecase/resendToken.usecase";
import { AuthLoginDto } from "./authLogin.dto";
import { AuthUpdateDto } from "./authUpdate.dto";
import { UpdateUserUsecase } from "@domain/user/usecases/updateUser.usecase";
import { userEntity } from "@domain/auth/entity/user.entity";
import { GetOneUserUsecase } from "@domain/user/usecases/getOneUser.usecase";
import { getUsersUsecase } from "@domain/user/usecases/getUsers.usecase";
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
    const usecase = new GenerateTokenUsecase(this.repo, this.gateway);
    const output: { token: string; user: userEntity } = await usecase.execute({
      username: body.username,
      password: body.password,
    });
    response.status(HttpStatus.OK).send({
      message: "token gerado com sucesso",
      user: output.user.props,
      token: output.token,
    });
  }
  @Post("signUp")
  async save(@Body() body: AuthSaveDto, @Res() response) {
    const usecase = new saveUserUsecase(this.repo, this.gateway, this.emailGateway);
    const user = await usecase.execute(body);
    console.log(user.is_verify());
    if (user.is_verify() === true || user.is_verify() === false) {
      response.status(HttpStatus.OK).send({
        message: "Esse email ja foi cadastrado, o seu usuario foi atualizado",
        user: user.props,
      });
    }
    response.status(HttpStatus.OK).send({
      message: "Usuario cadastrado com sucesso",
      user: user.props,
    });
  }
  @Get("send/token/:email/:route")
  async ResendToken(@Param("email") email: string, @Param("route") route: string, @Res() response) {
    const usecase = new ResendTokenUsecase(this.repo, this.gateway, this.emailGateway);
    const token = await usecase.execute(email, route);
    if (!token) {
      response.status(HttpStatus.BAD_REQUEST).send({
        message: "Esse usuario não existe no banco de dados",
      });
    }
    response.status(HttpStatus.OK).send({
      message: "token gerado com sucesso",
      token,
    });
  }
  @Get("user/:uuid")
  async getUserById(@Param("uuid") uuid: string, @Res() response) {
    const action = new GetOneUserUsecase(this.repo);
    const user = await action.execute(uuid);
    response.status(HttpStatus.OK).send({
      message: "Usuario encontrado com sucesso",
      user: user,
    });
  }
  @Get("users")
  async getAllUsers(@Res() response) {
    const action = new getUsersUsecase(this.repo);
    const users = await action.execute();
    response.status(HttpStatus.OK).send({
      message: "Usuarios encontrados com sucesso",
      user: users,
    });
  }
  @Post("password/recovery")
  async passwordRecovery(@Body() body: PasswordrecoveryDto, @Res() response) {
    const usecase = new passwordRecoveryUsecase(this.repo, this.gateway);
    const user = await usecase.execute(body);
    response.status(HttpStatus.OK).send({
      message: "Senha alterada com sucesso",
      user,
    });
  }
  @Get("verify/account/:token")
  async verifyAccount(@Param("token") token: string, @Res() response) {
    const verifyAccount = new verifyAccountUsecase(this.repo, this.gateway);
    await verifyAccount.execute(token);
    response.status(HttpStatus.OK).send({
      message: "Conta verificada com sucesso",
    });
  }
  @Patch("update/:uuid")
  async updateUser(@Param("uuid") uuid: string, @Res() response, @Body() body: AuthUpdateDto) {
    const action = new UpdateUserUsecase(this.repo);
    const user = await action.execute(body, uuid);
    response.status(HttpStatus.OK).send({
      message: "Usuario atualizado com sucesso",
      user: user,
    });
  }
}
