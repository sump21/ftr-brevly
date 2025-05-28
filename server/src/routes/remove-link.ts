import type { FastifyInstance } from "fastify";

export async function removeLinkRoute(app: FastifyInstance) {
	app.delete("/remove-link", async (request, reply) => {
		return { message: "Link removed successfully" };
	});
}
