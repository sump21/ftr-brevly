import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
	dbCredentials: {
		url: env.DATABASE_URL,
		port: env.DATABASE_PORT,
	},
	schema: "src/db/schema",
	dialect: "postgresql",
	out: "src/db/migrations",
} satisfies Config;
