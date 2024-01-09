import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class sendMessageDto {
  @ApiProperty({ example: "32a13c58-58f3-474b-b3f8-13972640278d" })
  @IsString({ message: "O uuid deve ser uma string" })
  @IsNotEmpty({ message: "O uuid não pode ser vazio" })
  receiver: string;

  @ApiProperty({ example: "32a13c58-58f3-474b-b3f8-13972640278d" })
  @IsString({ message: "O uuid deve ser uma string" })
  @IsNotEmpty({ message: "O uuid não pode ser vazio" })
  sender: string;

  @ApiProperty({ example: "mensagem de exemplo: olá" })
  @IsString({ message: "A mensagem deve ser uma string" })
  @IsNotEmpty({ message: "A mensagem não pode ser vazio" })
  message: string;
}
