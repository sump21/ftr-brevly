import { db } from "@/db";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const getOriginalLinkInput = z.object({
	id: z.string().uuid("ID must be a UUID"),
});

type GetOriginalLinkInput = z.input<typeof getOriginalLinkInput>;

type GetOriginalLinkOutput = {
	originalLink: string;
	accessCount: number;
};

export async function getOriginalLink(
	id: string,
): Promise<GetOriginalLinkOutput> {
	let link: GetOriginalLinkInput;
	try {
		link = getOriginalLinkInput.parse({ id });
	} catch (error) {
		if (error instanceof z.ZodError) {
			const message = error.errors.map((e) => e.message).join("; ");
			throw new Error(`Validation Error: ${message}`);
		}
		throw error;
	}

	const result = await db
		.select({
			originalLink: schema.links.originalLink,
			accessCount: schema.links.accessCount,
		})
		.from(schema.links)
		.where(eq(schema.links.id, link.id));

	if (result.length === 0) {
		throw new Error("Link not found");
	}

	return result[0];
}
