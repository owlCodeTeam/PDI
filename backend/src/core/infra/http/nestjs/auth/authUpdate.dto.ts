import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class AuthUpdateDto {
  @ApiProperty({ example: "userTeste" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  username: string;
  @ApiProperty({ example: "usuario01@email.com" })
  @IsString({ message: "O email deve ser uma string" })
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  email: string;
}
