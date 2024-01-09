require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/infra/http/nestjs/app.module";
import { ValidationPipe } from "@nestjs/common";
import { json, urlencoded } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "@infra/http/nestjs/auth/auth.module";
import { ErrorHandlingMiddleware } from "@infra/http/nestjs/middleware/exceptionMiddlewareErrors.middleware";
import { emailGatewayLocal } from "@infra/user/emailGateway.gateway";
import { ChatModule } from "@infra/http/nestjs/Chat/chat.module";
// import * as http from "http";
// import { Server } from "socket.io";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const server = http.createServer();
  // const io: Server = new Server(server, {
  //   cors: {
  //     origin: "http://localhost:9000",
  //   },
  // });
  // io.listen(4000);
  // io.on("connection", () => {
  //   io.emit("receive-message", "minha mãe é verde");
  // });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.enableCors();
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.use(new ErrorHandlingMiddleware(new emailGatewayLocal()).use);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("API")
    .setDescription("Documentação API")
    .setVersion("1.0")
    .addTag("Auth")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" }, "Authorization")
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AppModule, AuthModule, ChatModule],
  });
  SwaggerModule.setup("doc", app, swaggerDoc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
