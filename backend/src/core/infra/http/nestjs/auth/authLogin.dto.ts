import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
  @ApiProperty({ example: "usuario01@email.com" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "123456" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "013b6d7a-eb0e-42ee-9918-8335a82f1fd9" })
  companyUuid?: string;
}
