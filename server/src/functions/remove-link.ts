import { db } from "@/db";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const removeLinkInput = z.object({
	id: z.string().uuid("ID must be a UUID"),
});

type RemoveLinkInput = z.input<typeof removeLinkInput>;

export async function removeLink(id: string): Promise<RemoveLinkInput> {
	let link: RemoveLinkInput;
	try {
		link = removeLinkInput.parse({ id });
	} catch (error) {
		if (error instanceof z.ZodError) {
			const message = error.errors.map((e) => e.message).join("; ");
			throw new Error(`Validation Error: ${message}`);
		}
		throw error;
	}

	const existingLink = await db
		.select()
		.from(schema.links)
		.where(eq(schema.links.id, link.id));

	if (existingLink.length === 0) {
		throw new Error("Link not found");
	}

	await db.delete(schema.links).where(eq(schema.links.id, link.id));

	return link;
}
