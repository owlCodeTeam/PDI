import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class PasswordrecoveryDto {
  @ApiProperty({ example: "jwtToken" })
  @IsString({ message: "O token deve ser uma string" })
  @IsNotEmpty({ message: "O token não pode ser vazio" })
  token: string;

  @ApiProperty({ example: "123456" })
  @IsString({ message: "O senha deve ser uma string" })
  @IsNotEmpty({ message: "O senha não pode ser vazio" })
  newPassword: string;
}
