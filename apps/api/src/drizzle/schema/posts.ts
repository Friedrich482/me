import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

import { timestamps } from "../columns.helpers";

import { users } from "./users";

export const statusEnum = pgEnum("status", ["draft", "published"]);

export const posts = pgTable("posts", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid().toLowerCase()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  status: statusEnum(),
  publishedAt: timestamp("published_at"),
  ...timestamps,
  authorId: varchar("author_id", { length: 26 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
