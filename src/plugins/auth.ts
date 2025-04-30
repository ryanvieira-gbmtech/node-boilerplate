import { env } from "@/env";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

export async function registerAuthPlugins(app: FastifyInstance) {
	// Register JWT authentication
	// This will allow you to use JWT tokens for authentication
	await app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
		cookie: {
			cookieName: "refreshToken",
			signed: false,
		},
		sign: {
			expiresIn: "10m",
		},
	});

	// Register cookie support
	// This will allow you to use cookies for authentication
	await app.register(fastifyCookie);
}
