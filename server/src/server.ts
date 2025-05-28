import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { addLinkRoute } from "./routes/add-link";
import { removeLinkRoute } from "./routes/remove-link";

const server = fastify();

server.register(fastifyCors, { origin: "*" });

server.register(addLinkRoute);
server.register(removeLinkRoute);

server.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
	console.log("HTTP Server running!");
});
