import superjson from "superjson";
import { JWTDto } from "src/common/dto";
import { EnvService } from "src/env/env.service";
import { errorFormatter } from "src/filters/error-formatter";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export type TrpcContext = {
  req: trpcExpress.CreateExpressContextOptions["req"];
  res: trpcExpress.CreateExpressContextOptions["res"];
  user?:
    | {
        sub: string;
      }
    | undefined;
};

export const createContext = async (
  opts: trpcExpress.CreateExpressContextOptions,
): Promise<TrpcContext> => {
  return {
    req: opts.req,
    res: opts.res,
  };
};

@Injectable()
export class TrpcService {
  trpc;
  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {
    this.trpc = initTRPC.context<TrpcContext>().create({
      transformer: superjson,
      errorFormatter: ({ error, shape }) =>
        errorFormatter(this.envService, { error, shape }),
    });
  }

  // these routes are publicly accessible to everyone
  publicProcedure() {
    return this.trpc.procedure;
  }

  // these routes requires authentication:
  protectedProcedure() {
    const procedure = this.trpc.procedure.use(async (opts) => {
      const payload = await this.getPayload(opts.ctx);

      return opts.next({
        ctx: {
          ...opts.ctx,
          user: { sub: payload.sub },
        },
      });
    });
    return procedure;
  }

  async getPayload(ctx: TrpcContext) {
    // get jwt from cookies
    const accessToken = ctx.req.cookies?.auth_token;

    if (!accessToken) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Token not found",
      });
    }

    try {
      const rawPayload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.envService.get("JWT_SECRET"),
      });

      const parsedPayload = JWTDto.safeParse(rawPayload);

      if (!parsedPayload.success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Payload malformed",
        });
      }

      const payload = parsedPayload.data;

      return payload;
    } catch (error) {
      if (error instanceof Error && error.name !== "JsonWebTokenError") {
        console.error("Unexpected Error:", error);
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "An error occurred",
      });
    }
  }
}
