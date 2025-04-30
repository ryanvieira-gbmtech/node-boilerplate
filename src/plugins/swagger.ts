import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export async function registerSwaggerPlugins(app: FastifyInstance) {
	await app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Node Boilerplate API",
				description: "A boilerplate for building APIs with Node.js",
				version: "1.0.0",
			},
		},
	});

	await app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});
}
