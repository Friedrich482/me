import { z } from "zod";
import { RegisterUserDto, SignInUserDto } from "src/common/dto";

export type SignInUserDtoType = z.infer<typeof SignInUserDto>;

export type RegisterUserDtoType = z.infer<typeof RegisterUserDto>;
