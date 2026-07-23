import { z } from "zod";

import * as trpcExpress from "@trpc/server/adapters/express";

export const JWTDto = z.object({
  sub: z.ulid(),
  iat: z.number().int(),
  exp: z.number().int(),
});

export type JWTDtoType = z.infer<typeof JWTDto>;

export type TrpcContext = {
  req: trpcExpress.CreateExpressContextOptions["req"];
  res: trpcExpress.CreateExpressContextOptions["res"];
  user?: Pick<JWTDtoType, "sub">;
};
