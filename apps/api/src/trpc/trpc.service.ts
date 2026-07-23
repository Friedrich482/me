import { JWTDto, TrpcContext } from "@/common/dto";
import { EnvService } from "@/env/env.service";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TRPCError } from "@trpc/server";

import { TRPC_PROVIDER } from "./constants";
import { TrpcInstance } from "./providers/trpc.provider";

@Injectable()
export class TrpcService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,

    @Inject(TRPC_PROVIDER)
    readonly trpc: TrpcInstance,
  ) {}

  // these routes are publicly accessible to everyone
  publicProcedure() {
    return this.trpc.procedure;
  }

  // these routes requires authentication
  protectedProcedure() {
    return this.trpc.procedure.use((opts) => this.authMiddleware(opts));
  }

  async authMiddleware(
    opts: Parameters<Parameters<TrpcInstance["middleware"]>[number]>[number],
  ) {
    const payload = await this.getPayload(opts.ctx);

    return opts.next({
      ctx: {
        ...opts.ctx,
        user: { sub: payload.sub },
      },
    });
  }

  async getPayload(ctx: TrpcContext) {
    // get jwt from cookies
    const accessToken = ctx.req.cookies?.auth_token;

    if (!accessToken) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Auth Token not found",
      });
    }

    let rawPayload: unknown;
    try {
      rawPayload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.envService.get("JWT_SECRET"),
      });
    } catch {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      });
    }

    const parsedPayload = JWTDto.safeParse(rawPayload);

    if (!parsedPayload.success) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payload malformed",
      });
    }

    const payload = parsedPayload.data;

    return payload;
  }
}
