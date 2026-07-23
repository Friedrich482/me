import { AuthRouter } from "@/auth/auth.router";
import { MediaRouter } from "@/media/media.router";
import { PostsRouter } from "@/posts/posts.router";
import { TagsRouter } from "@/tags/tags.router";
import { TrpcService } from "@/trpc/trpc.service";
import { Provider } from "@nestjs/common";

import { APP_ROUTER_PROVIDER } from "../constants";

export const appRouterProvider = {
  provide: APP_ROUTER_PROVIDER,
  useFactory: (
    trpcService: TrpcService,
    authRouter: AuthRouter,
    tagsRouter: TagsRouter,
    postsRouter: PostsRouter,
    mediaRouter: MediaRouter,
  ) => {
    const appRouter = trpcService.trpc.router({
      ...authRouter.procedures(),
      ...tagsRouter.procedures(),
      ...postsRouter.procedures(),
      ...mediaRouter.procedures(),

      health: {
        ping: trpcService.publicProcedure().query(() => ({ status: "OK" })),
      },
    });

    return appRouter;
  },
  inject: [TrpcService, AuthRouter, TagsRouter, PostsRouter, MediaRouter],
} satisfies Provider;

export type AppRouter = ReturnType<(typeof appRouterProvider)["useFactory"]>;
