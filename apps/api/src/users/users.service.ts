import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { users } from "src/drizzle/schema";

import {
  CreateUserDtoType,
  FindByEmailDtoType,
  FindByIdDtoType,
  UpdateUserDtoType,
} from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase,
  ) {}
  private readonly saltRounds = 10;

  async create(createUserDto: CreateUserDtoType) {
    const { email, password } = createUserDto;

    // check if a user with the email already exists
    const [existingUserWithSameEmail] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUserWithSameEmail) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "This email is already used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const [userCreated] = await this.db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
      });
    return userCreated;
  }

  async findOne(findByIdDto: FindByIdDtoType) {
    const { id } = findByIdDto;

    const [user] = await this.db
      .select({
        email: users.email,
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async findByEmail(findByEmailDto: FindByEmailDtoType) {
    const { email } = findByEmailDto;

    const [user] = await this.db
      .select({
        email: users.email,
        id: users.id,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    return user;
  }

  async update(updateUserDto: UpdateUserDtoType) {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException("You need to specify at least one field");
    }
    const { id } = updateUserDto;
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    if (!user) throw new NotFoundException("User not found");

    const updateData = { ...updateUserDto };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        this.saltRounds,
      );
    }

    const [returningUser] = await this.db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning({
        email: users.email,
      });

    return returningUser;
  }
}
