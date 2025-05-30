import { db } from "@/db";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const getOriginalLinkInput = z.object({
	shortLink: z.string(),
});

type GetOriginalLinkInput = z.input<typeof getOriginalLinkInput>;

type GetOriginalLinkOutput = {
	id: string;
	originalLink: string;
	accessCount: number;
};

export async function getOriginalLink(
	shortLink: string,
): Promise<GetOriginalLinkOutput> {
	let link: GetOriginalLinkInput;
	try {
		link = getOriginalLinkInput.parse({ shortLink });
	} catch (error) {
		if (error instanceof z.ZodError) {
			const message = error.errors.map((e) => e.message).join("; ");
			throw new Error(`Validation Error: ${message}`);
		}
		throw error;
	}

	const result = await db
		.select({
			id: schema.links.id,
			originalLink: schema.links.originalLink,
			accessCount: schema.links.accessCount,
		})
		.from(schema.links)
		.where(eq(schema.links.shortLink, link.shortLink));

	if (result.length === 0) {
		throw new Error("Link not found");
	}

	return result[0];
}
