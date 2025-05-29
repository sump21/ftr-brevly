import { addLink } from "@/functions/add-link";
import type { FastifyInstance } from "fastify";

export async function addLinkRoute(app: FastifyInstance) {
	app.post("/add-link", async (request, reply) => {
		const { originalLink, shortLink } = request.body as {
			originalLink: string;
			shortLink: string;
		};

		if (!originalLink || !shortLink) {
			return reply
				.status(400)
				.send({ error: "originalLink AND shortLink are required" });
		}

		await addLink({ originalLink, shortLink });

		return reply.status(201).send();
	});
}
