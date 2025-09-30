import type { FastifyReply, FastifyRequest } from "fastify";
import { authenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import type { SignInRequest } from "../dto/request";

export async function signInHandler(request: FastifyRequest<{ Body: SignInRequest }>, reply: FastifyReply) {
	const { email, password } = request.body;

	try {
		const { user } = await authenticateUseCase({
			email,
			password,
		});

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id.toString(),
				},
			},
		);

		const refreshToken = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id.toString(),
					expiresIn: "7d",
				},
			},
		);

		return reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({
				token,
			});
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(401).send({ message: error.message });
		}
	}
}
