import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { addLinkRoute } from "./routes/add-link";
import { generateLinksCsvRoute } from "./routes/generate-csv-links";
import { getLinksRoute } from "./routes/get-links";
import { getOriginalLinkRoute } from "./routes/get-original-link";
import { incrementAccessCountLinkRoute } from "./routes/increment-access-count-link";
import { removeLinkRoute } from "./routes/remove-link";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	return reply.status(500).send({
		error: error.message,
	});
});

server.register(fastifyCors, { 
	origin: "*",
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH',],
});

server.register(addLinkRoute);
server.register(removeLinkRoute);
server.register(getLinksRoute);
server.register(incrementAccessCountLinkRoute);
server.register(getOriginalLinkRoute);
server.register(generateLinksCsvRoute);

server.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
	console.log("HTTP Server running!");
});
