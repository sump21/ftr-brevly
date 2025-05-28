import type { FastifyInstance } from "fastify";

export async function addLinkRoute(app: FastifyInstance) {
	app.post("/add-link", async (request, reply) => {
		return {
			message: "Link added successfully",
		};
	});
}
