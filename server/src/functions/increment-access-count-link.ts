import { db } from "@/db";
import { schema } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

const incrementAccessCountLinkInput = z.object({
	id: z.string().uuid("ID must be a UUID"),
});

type IncrementAccessCountLinkInput = z.input<
	typeof incrementAccessCountLinkInput
>;

export async function incrementAccessCountLink(
	id: string,
): Promise<IncrementAccessCountLinkInput> {
	let link: IncrementAccessCountLinkInput;
	try {
		link = incrementAccessCountLinkInput.parse({ id });
	} catch (error) {
		if (error instanceof z.ZodError) {
			const message = error.errors.map((e) => e.message).join("; ");
			throw new Error(`Validation Error: ${message}`);
		}
		throw error;
	}

	const updated = await db
		.update(schema.links)
		.set({ accessCount: sql`${schema.links.accessCount} + 1` })
		.where(eq(schema.links.id, link.id))
		.returning();

	if (!updated.length) {
		throw new Error("Link not found");
	}

	return updated[0];
}
