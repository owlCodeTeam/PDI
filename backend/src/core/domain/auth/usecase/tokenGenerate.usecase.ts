import { userEntity } from "@core/";

export class GenerateTokenUsecase {
  constructor() {}

  public async execute(user: userEntity) {
   if(user.password() === "123"){
    return {token: "abc"};
   }
   throw new Error("Dados inválidos");
  }
}