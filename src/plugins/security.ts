import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import type { FastifyInstance } from "fastify";

export async function registerSecurityPlugins(app: FastifyInstance) {
	// Enable security headers for all routes
	// This will set various HTTP headers to help protect your app from common vulnerabilities
	app.register(fastifyHelmet, {
		global: true,
	});

	// Enable CORS for all routes
	// This will allow cross-origin requests from any origin
	app.register(fastifyCors, {
		origin: "*",
	});
}
