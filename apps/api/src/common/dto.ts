import { z } from "zod";

export const RegisterUserDto = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignInUserDto = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export const JWTDto = z.object({
  sub: z.ulid(),
  iat: z.number().int(),
  exp: z.number().int(),
});

export type JWTDtoType = z.infer<typeof JWTDto>;
