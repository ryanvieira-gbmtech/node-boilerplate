import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";

import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
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
