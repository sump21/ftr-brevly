import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	originalLink: text("original_link").notNull(),
	shortLink: text("short_link").notNull().unique(),
	accessCount: integer("access_count").notNull().default(0),
	createdAt: timestamp("created_at").defaultNow(),
});
