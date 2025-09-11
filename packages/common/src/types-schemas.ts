import z from "zod";

import { STATUS_ENUM } from "./constants";

export const slugSchema = z
  .string()
  .min(1, "Slug cannot be empty")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase, alphanumeric, and may contain hyphens (no spaces, no special characters)"
  );

export const isoDateSchema = z.iso.datetime();

export const SignInUserDto = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export const RegisterUserDto = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const AddTagToPostDto = z.object({
  name: z.string().trim().min(1),
  slug: slugSchema,
  postId: z.ulid(),
});

export const CreatePostDto = z.object({
  title: z.string().trim().min(1),
  slug: slugSchema,
  content: z.string().trim().min(1),
  status: z.enum(STATUS_ENUM),
});

export type SignInUserDtoType = z.infer<typeof SignInUserDto>;

export type RegisterUserDtoType = z.infer<typeof RegisterUserDto>;

export type AddTagToPostDtoType = z.infer<typeof AddTagToPostDto>;
