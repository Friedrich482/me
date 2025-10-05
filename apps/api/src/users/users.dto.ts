import { z } from "zod";
import { roles } from "src/common/constants";

import { RegisterUserDto } from "@repo/common/types-schemas";

export const CreateUserDto = z.object({
  ...RegisterUserDto.shape,
  role: z.enum(roles),
});

export const UpdateUserDto = RegisterUserDto.partial();

export const FindByIdDto = z.object({
  id: z.ulid(),
});

export const FindByEmailDto = z.object({
  email: z.email(),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto> & { id: string };

export type FindByIdDtoType = z.infer<typeof FindByIdDto>;

export type FindByEmailDtoType = z.infer<typeof FindByEmailDto>;
