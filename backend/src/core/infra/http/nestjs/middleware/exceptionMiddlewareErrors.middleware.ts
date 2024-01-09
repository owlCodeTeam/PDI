import { SendEmailToAdmin } from "@domain/user/usecases/sendEmailToAdmin.usecase";
import { emailGatewayLocal } from "@infra/user/emailGateway.gateway";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { apiError } from "../helpers/api-Error.helper";

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  constructor(readonly emailGateway: emailGatewayLocal) {}
  use(req: any, res: any, next: () => void) {
    res.error = async (error: Error & Partial<apiError>) => {
      const statusCode = error.statusCode ?? 500;
      if (statusCode === 500) {
        const action = new SendEmailToAdmin(this.emailGateway);
        await action.execute(["joaopleseux@gmail.com", "dione.bruno@gmail.com"]);
        res.status(500).json({ message: "Ocorreu um erro inesperado" });
      }
      console.log(error);
      res.status(statusCode).json({ message: error.message, internalMessage: error.internalMessage });
    };
    next();
  }
}
