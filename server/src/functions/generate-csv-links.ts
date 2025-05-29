import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { db } from "@/db";
import { schema } from "@/db/schema";
import { uploadCsvToStorage } from "@/storage/upload-csv-to-storage";
import { stringify } from "csv-stringify/sync";
import { z } from "zod";

const generateCsvLinksInput = z.object({
	folder: z.literal("downloads"),
});

type GenerateCsvLinksInput = z.input<typeof generateCsvLinksInput>;

export async function generateCsvLinks(input: GenerateCsvLinksInput) {
	generateCsvLinksInput.parse(input);

	const links = await db.select().from(schema.links);

	if (links.length === 0) {
		throw new Error("No links found");
	}

	const csvData = links.map((link) => ({
		id: link.id,
		originalLink: link.originalLink,
		shortLink: link.shortLink,
		accessCount: link.accessCount,
		createdAt: link.createdAt.toISOString(),
	}));

	const csvString = stringify(csvData, {
		header: true,
		columns: [
			{ key: "id", header: "ID" },
			{ key: "originalLink", header: "Original URL" },
			{ key: "shortLink", header: "Short URL" },
			{ key: "accessCount", header: "Access Count" },
			{ key: "createdAt", header: "Created At" },
		],
	});

	const csvStream = Readable.from([csvString]);

	const fileName = `links-${randomUUID()}.csv`;

	const { url, key } = await uploadCsvToStorage({
		folder: "downloads",
		fileName,
		contentType: "text/csv",
		contentStream: csvStream,
	});

	return { key, url };
}
