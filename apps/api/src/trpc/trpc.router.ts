import { INestApplication, Injectable } from "@nestjs/common";
import * as trpcExpress from "@trpc/server/adapters/express";
import { AuthRouter } from "src/auth/auth.router";
import { PostsRouter } from "src/posts/posts.router";

import { TrpcService, createContext } from "./trpc.service";

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly authRouter: AuthRouter,
    private readonly postsRouter: PostsRouter,
  ) {}

  appRouter = this.trpcService.trpc.router({
    ...this.authRouter.procedures,
    ...this.postsRouter.procedures,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
        responseMeta: () => {
          return {
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
    );
  }
}

export type AppRouter = TrpcRouter["appRouter"];
