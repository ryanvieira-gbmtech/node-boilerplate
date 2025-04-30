import { env } from "@/env";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

export async function registerAuthPlugins(app: FastifyInstance) {
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

	await app.register(fastifyCookie);
}
