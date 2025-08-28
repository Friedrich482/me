import { RegisterUserDto } from "src/common/dto";
import z from "zod";

export const CreateUserDto = RegisterUserDto;

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
