import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class AuthSaveDto {
  @ApiProperty({ example: "userTeste" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  username: string;

  @ApiProperty({ example: "123456" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  password: string;

  @ApiProperty({ example: "usuario01@email.com" })
  @IsString({ message: "O email deve ser uma string" })
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  email: string;

  @ApiProperty({ example: "111.111.111-11" })
  @IsString({ message: "O cpf deve ser uma string" })
  @IsNotEmpty({ message: "O cpf não pode ser vazio" })
  cpf: string;
}
