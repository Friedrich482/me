import cookieParser from "cookie-parser";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { AppRouterRouter } from "./app-router/app-router.router";
import { ALLOWED_CLIENTS, API_PORT } from "./constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ALLOWED_CLIENTS,
    credentials: true,
  });
  app.use(cookieParser());

  const trpc = app.get(AppRouterRouter);
  trpc.applyMiddleware(app);

  await app.listen(process.env.PORT ?? API_PORT);
}

bootstrap();
