import { removeLink } from "@/functions/remove-link";
import type { FastifyInstance } from "fastify";

export async function removeLinkRoute(app: FastifyInstance) {
	app.delete("/remove-link", async (request, reply) => {
		const { id } = request.body as { id: string };

		if (!id) {
			return reply.status(400).send({ error: "ID is required" });
		}

		try {
			const result = await removeLink(id);

			return reply.status(200).send({
				message: "Link removed successfully",
				data: { id: result.id },
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
		}
	});
}
