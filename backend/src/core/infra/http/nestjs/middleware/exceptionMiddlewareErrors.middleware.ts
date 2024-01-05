import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.error = (message: string, status: number = HttpStatus.PRECONDITION_FAILED) => {
      res.status(status).json({ message });
    };

    next();
  }
}
