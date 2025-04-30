import type { FastifyInstance } from "fastify";
import { CreateUserRequest, SignInRequest } from "./dto/request";
import { CreateUserResponse, SignInResponse } from "./dto/response";
import { createUser } from "./handlers/create-user";
import { signIn } from "./handlers/sign-in";

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

	app.post(
		"/users",
		{
			schema: {
				tags: ["Users"],
				body: CreateUserRequest,
				response: {
					201: CreateUserResponse,
				},
			},
		},
		createUser,
	);
}
