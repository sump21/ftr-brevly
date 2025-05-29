import { db } from "@/db";
import { schema } from "@/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";

type GetLinksOutput = {
	links: {
		id: string;
		originalLink: string;
		shortLink: string;
		accessCount: number;
		createdAt: Date | null;
	}[];
};

export async function getLinks(): Promise<GetLinksOutput> {
	const links = await db
		.select({
			id: schema.links.id,
			originalLink: schema.links.originalLink,
			shortLink: schema.links.shortLink,
			accessCount: schema.links.accessCount,
			createdAt: schema.links.createdAt,
		})
		.from(schema.links)
		.orderBy(desc(schema.links.createdAt));

	return { links };
}
