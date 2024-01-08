require("dotenv").config();
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/infra/http/nestjs/app.module";
import { ValidationPipe } from "@nestjs/common";
import { json, urlencoded } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "@infra/http/nestjs/auth/auth.module";
import { ErrorHandlingMiddleware } from "@infra/http/nestjs/middleware/exceptionMiddlewareErrors.middleware";
import { emailGatewayLocal } from "@infra/user/emailGateway.gateway";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.enableCors();
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.use(new ErrorHandlingMiddleware(new emailGatewayLocal()).use);
  app.useWebSocketAdapter(new IoAdapter(app));
  const swaggerConfig = new DocumentBuilder()
    .setTitle("API")
    .setDescription("Documentação API")
    .setVersion("1.0")
    .addTag("Auth")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" }, "Authorization")
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AppModule, AuthModule],
  });
  SwaggerModule.setup("doc", app, swaggerDoc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
