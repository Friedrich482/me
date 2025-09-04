import cookieParser from "cookie-parser";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ALLOWED_CLIENTS, API_PORT } from "./constants";
import { TrpcRouter } from "./trpc/trpc.router";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ALLOWED_CLIENTS,
    credentials: true,
  });
  app.use(cookieParser());

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(process.env.PORT ?? API_PORT);
}

bootstrap();
