import { z } from "zod";

import { STATUS_ENUM } from "./constants";

export const SlugSchema = z
  .string()
  .min(1, "Slug cannot be empty")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase, alphanumeric, and may contain hyphens (no spaces, no special characters)",
  );

export const IsoStringSchema = z.iso.datetime();

export const SignInUserSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export const RegisterUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const AddTagToPostSchema = z.object({
  name: z.string().trim().min(1),
  slug: SlugSchema,
  postId: z.ulid(),
});

export const PostSchema = z.object({
  title: z.string().trim().min(1),
  slug: SlugSchema,
  content: z.string().trim().min(1),
  status: z.enum(STATUS_ENUM),
});

export type SignInUser = z.infer<typeof SignInUserSchema>;

export type RegisterUser = z.infer<typeof RegisterUserSchema>;

export type AddTagToPost = z.infer<typeof AddTagToPostSchema>;
