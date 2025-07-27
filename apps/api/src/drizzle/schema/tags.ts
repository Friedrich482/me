import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

import { timestamps } from "../columns.helpers";

export const tags = pgTable("tags", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid().toLowerCase()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  ...timestamps,
});
