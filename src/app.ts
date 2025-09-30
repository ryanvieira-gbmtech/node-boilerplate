import "./lib/sentry";

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { routes } from "./http/controllers/routes";
import { registerAllPlugins } from "./plugins";

export const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

registerAllPlugins(app);

app.register(routes, { prefix: "/api" });

app.setErrorHandler((error, request, reply) => {
	return reply.status(error.statusCode ?? 500).send({
		error: error.name,
		message: error.message,
		path: request.url,
		method: request.method,
		statusCode: error.statusCode ?? 500,
		timestamp: new Date().toISOString(),
	});
});
