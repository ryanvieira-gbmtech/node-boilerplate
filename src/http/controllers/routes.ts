import type { FastifyInstance } from "fastify";
import { createUser } from "./create-user";
import { CreateUserRequest, SignInRequest } from "./dto/request";
import { CreateUserResponse, SignInResponse } from "./dto/response";
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
