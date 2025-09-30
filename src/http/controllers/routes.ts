import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middleware/verify-jwt";
import { CreateUserRequest, SignInRequest } from "./dto/request";
import { CreateUserResponse, SignInResponse } from "./dto/response";
import { createUserHandler } from "./handlers/create-user";
import { signInHandler } from "./handlers/sign-in";
import { getUserProfileHandler } from "./handlers/user-profile";

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
		signInHandler,
	);

	app.post<{ Body: CreateUserRequest }>(
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
		createUserHandler,
	);

	app.get("/me", { onRequest: [verifyJwt] }, getUserProfileHandler);
}
