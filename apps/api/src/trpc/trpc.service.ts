import * as trpcExpress from '@trpc/server/adapters/express';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { initTRPC, TRPCError } from '@trpc/server';
import { EnvService } from 'src/env/env.service';
import superjson from 'superjson';
import { ZodError, ZodIssue } from 'zod';

export type TrpcContext = {
  req: trpcExpress.CreateExpressContextOptions['req'];
  res: trpcExpress.CreateExpressContextOptions['res'];
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
      errorFormatter: ({ shape, error }) => {
        const isDev = process.env.NODE_ENV === 'development';

        // Handle TRPCError with Zod validation errors
        if (error instanceof TRPCError && error.code === 'BAD_REQUEST') {
          // Check if the cause is a ZodError
          if (error.cause instanceof ZodError) {
            return {
              ...shape,
              message: 'Validation failed',
              data: {
                code: shape.data.code,
                httpStatus: shape.data.httpStatus,
                validationErrors: error.cause.issues.map((issue) => ({
                  field: issue.path.join('.'),
                  message: issue.message,
                  code: issue.code,
                })),
                ...(isDev && {
                  stack: shape.data.stack,
                  path: shape.data.path,
                }),
              },
            };
          }
        }

        // For other errors, try to parse if it's a JSON array of errors
        let cleanMessage = error.message;
        let validationErrors: Array<{
          field: string;
          message: string;
          code: string;
        }> = [];

        try {
          if (error.message.startsWith('[') && error.message.endsWith(']')) {
            const parsedErrors = JSON.parse(error.message);
            if (Array.isArray(parsedErrors)) {
              cleanMessage = 'Validation failed';
              validationErrors = parsedErrors.map((err: any) => ({
                field: err.path?.join('.') || 'unknown',
                message: err.message || 'Validation error',
                code: err.code || 'unknown',
              }));
            }
          }
        } catch {
          // If parsing fails, keep original message
        }

        return {
          ...shape,
          message: cleanMessage,
          data: {
            code: shape.data.code,
            httpStatus: shape.data.httpStatus,
            ...(validationErrors.length > 0 && { validationErrors }),
            ...(isDev && {
              stack: shape.data.stack,
              path: shape.data.path,
            }),
          },
        };
      },
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

      if (!payload) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      // user is authorized
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
    // get jwt token from cookies (browser) or the headers (extension)
    const accessToken =
      ctx.req.cookies?.auth_token ??
      (ctx.req.headers.authorization?.replace('Bearer ', '') || '');

    if (!accessToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Token not found',
      });
    }

    try {
      return { sub: 'nothing' };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'An error occurred',
      });
    }
  }
}
