import { getOriginalLink } from "@/functions/get-original-link";
import type { FastifyInstance } from "fastify";

export async function getOriginalLinkRoute(app: FastifyInstance) {
	app.get("/original-url/:id", async (request, reply) => {
		const { id } = request.params as { id: string };

		if (!id) {
			return reply.status(400).send({ error: "ID is required" });
		}

		try {
			const result = await getOriginalLink(id);

			return reply.status(200).send(result);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.startsWith("Validation Error")) {
					return reply.status(400).send({ error: error.message });
				}

				if (error.message === "Link not found") {
					return reply.status(404).send({ error: "Link not found" });
				}
			}
		}
	});
}
