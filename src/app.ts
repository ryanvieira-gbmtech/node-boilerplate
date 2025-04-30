import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";

import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { env } from "./env";

export const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "10m",
	},
});

app.register(fastifyCookie);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Node Boilerplate API",
			description: "A boilerplate for building APIs with Node.js",
			version: "1.0.0",
		},
	},
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});
