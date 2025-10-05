import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";
import { roles } from "src/common/constants";

import { timestamps } from "../columns.helpers";

export const roleEnum = pgEnum("role", roles);

export const users = pgTable("users", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid().toLowerCase()),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum(),
  ...timestamps,
});
