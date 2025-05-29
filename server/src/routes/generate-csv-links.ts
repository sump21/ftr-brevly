import { generateCsvLinks } from "@/functions/generate-csv-links";
import type { FastifyInstance } from "fastify";

export async function generateLinksCsvRoute(app: FastifyInstance) {
	app.get("/generate-csv-links", async (request, reply) => {
		try {
			const { url } = await generateCsvLinks({
				folder: "downloads",
			});

			return reply.status(200).send({
				message: "CSV generated successfully",
				url,
			});
		} catch (error) {
			console.error(error);
			return reply.status(500).send({
				error: "Failed to generate CSV",
			});
		}
	});
}
