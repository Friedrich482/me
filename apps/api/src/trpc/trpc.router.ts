import * as trpcExpress from '@trpc/server/adapters/express';
import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService, createContext } from './trpc.service';
import z from 'zod';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpcService: TrpcService) {}

  appRouter = this.trpcService.trpc.router({
    getHello: this.trpcService
      .publicProcedure()
      .input(z.object({ name: z.string() }))
      .query(({ input }) => `Hello ${input.name}`),
  });

  async applyMiddleware(app: INestApplication) {
    const isDev = process.env.NODE_ENV === 'development';

    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
        onError: ({ path, error, input }) => {
          if (isDev) {
            console.error(`tRPC failed on ${path}:`, error);
          }
        },
        responseMeta: () => {
          return {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        },
      }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
