import { getLinks } from "@/functions/get-links";
import type { FastifyInstance } from "fastify";

export async function getLinksRoute(app: FastifyInstance) {
	app.get("/links", async (request, reply) => {
		const result = await getLinks();

		return reply.status(200).send(result);
	});
}
