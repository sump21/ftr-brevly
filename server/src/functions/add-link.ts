import { db } from "@/db";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const addLinkInput = z.object({
	originalLink: z.string().url("originalLink must be a valid URL"),
	shortLink: z
		.string()
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			"shortLink must be alphanumeric and can contain dashes and underscores",
		),
});

type AddLinkInput = z.input<typeof addLinkInput>;

export async function addLink(input: AddLinkInput): Promise<{
	originalLink: string;
	shortLink: string;
}> {
	let parsed: AddLinkInput;
	try {
		parsed = addLinkInput.parse(input);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const messages = error.errors.map((err) => err.message).join("; ");
			throw new Error(messages);
		}
		throw error;
	}

	const { originalLink, shortLink } = parsed;

	const existingLink = await db
		.select()
		.from(schema.links)
		.where(eq(schema.links.shortLink, shortLink));

	if (existingLink.length > 0) {
		throw new Error("shortLink already exists");
	}

	await db.insert(schema.links).values({
		originalLink: originalLink,
		shortLink: shortLink,
	});

	return {
		originalLink,
		shortLink,
	};
}
