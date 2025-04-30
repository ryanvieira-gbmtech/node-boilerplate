import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export async function registerSwaggerPlugins(app: FastifyInstance) {
	// Register Swagger documentation
	// This will generate API documentation based on your routes and schemas
	await app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Node Boilerplate API",
				description: "A boilerplate for building APIs with Node.js",
				version: "1.0.0",
			},
		},
	});

	// Register Swagger UI
	// This will provide a web interface for viewing and interacting with your API documentation
	await app.register(fastifySwaggerUi, {
		routePrefix: "/docs",
	});
}
