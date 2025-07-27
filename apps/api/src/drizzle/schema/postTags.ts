import { pgTable, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

import { users } from "./users";

export const postTags = pgTable("post_tags", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid().toLowerCase()),
  postId: varchar("post_id", { length: 26 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tagId: varchar("tag_id", { length: 26 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
