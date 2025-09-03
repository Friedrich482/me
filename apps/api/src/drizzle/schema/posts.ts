import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";
import { STATUS_ENUM } from "src/common/constants";

import { timestamps } from "../columns.helpers";
import { users } from "./users";

export const pgStatusEnum = pgEnum("status", STATUS_ENUM);

export const posts = pgTable("posts", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid().toLowerCase()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  status: pgStatusEnum().notNull(),
  publishedAt: timestamp("published_at"),
  authorId: varchar("author_id", { length: 26 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});
