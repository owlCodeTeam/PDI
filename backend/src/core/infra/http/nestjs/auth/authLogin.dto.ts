import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
  @ApiProperty({ example: "usuario01@email.com" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  username: string;

  @ApiProperty({ example: "123456" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  password: string;

  @ApiProperty({ example: "013b6d7a-eb0e-42ee-9918-8335a82f1fd9" })
  companyUuid?: string;
}
