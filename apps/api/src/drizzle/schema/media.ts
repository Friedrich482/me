import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ulid } from "ulid";

import { timestamps } from "../columns.helpers";

import { posts } from "./posts";

export const media = pgTable("media", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid().toLowerCase()),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  postId: varchar("post_id", { length: 26 })
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  ...timestamps,
});
