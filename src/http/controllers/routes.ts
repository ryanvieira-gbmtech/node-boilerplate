import type { FastifyInstance } from "fastify";
import { SignInRequest } from "./dto/request";
import { SignInResponse } from "./dto/response";
import { signIn } from "./sign-in";

export async function routes(app: FastifyInstance) {
	app.post(
		"/sign-in",
		{
			schema: {
				tags: ["Auth"],
				body: SignInRequest,
				response: {
					201: SignInResponse,
				},
			},
		},
		signIn,
	);
}
