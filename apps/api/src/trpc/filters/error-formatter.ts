import { z, ZodError } from "zod";

import { TRPCError } from "@trpc/server";
import { DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import";

import { Environment } from "../trpc.dto";

export const errorFormatter = ({
  environment,
  error,
  shape,
}: {
  environment: Environment;
  error: TRPCError;
  shape: DefaultErrorShape;
}) => {
  const isDev = environment === "development";

  return {
    ...shape,
    message:
      error.cause instanceof ZodError
        ? z.prettifyError(error.cause)
        : error.message,

    data: {
      code: shape.data.code,
      httpStatus: shape.data.httpStatus,
      path: shape.data.path,
      ...(isDev && { stack: shape.data.stack }),
    },
  };
};
