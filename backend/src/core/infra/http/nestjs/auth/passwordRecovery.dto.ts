import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class PasswordrecoveryDto {
  @ApiProperty({ example: "jwtToken" })
  @IsString({ message: "O token deve ser uma string" })
  @IsNotEmpty({ message: "O token não pode ser vazio" })
  token: string;

  @ApiProperty({ example: "123456" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  newPassword: string;
}
