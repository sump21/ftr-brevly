import { incrementAccessCountLink } from "@/functions/increment-access-count-link";
import type { FastifyInstance } from "fastify";

export async function incrementAccessCountLinkRoute(app: FastifyInstance) {
	app.patch("/increment-access-count-link", async (request, reply) => {
		const { id } = request.body as { id: string };

		if (!id) {
			return reply.status(400).send({ error: "ID is required" });
		}

		try {
			await incrementAccessCountLink(id);

			return reply.status(200).send({
				message: "Access count incremented successfully",
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.startsWith("Validation Error")) {
					return reply.status(400).send({ error: error.message });
				}

				if (error.message === "Link not found") {
					return reply.status(404).send({ error: "Link not found" });
				}
			}

			return reply.status(500).send({
				error: "Internal server error",
				details: error,
			});
		}
	});
}
