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
    const isDev = process.env.NODE_ENV === "development";

    app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
        onError: ({ path, error }) => {
          if (isDev) {
            console.error(`tRPC failed on ${path}:`, error);
          }
        },
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
