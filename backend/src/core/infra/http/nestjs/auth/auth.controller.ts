import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthLoginDto } from "./authLogin.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor() {}

  @Post("token-generate")
  async tokenGenerate(@Body() body: AuthLoginDto, @Res() response) {
    response.status(HttpStatus.OK).send({
      message: "token gerado com sucesso",
    });
  }
}
