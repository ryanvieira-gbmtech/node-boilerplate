import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { SignInBodyRequest } from "./dto/request";

export async function signIn(
	request: FastifyRequest<{ Body: SignInBodyRequest }>,
	reply: FastifyReply,
) {
	const { email, password } = request.body;

	try {
		const authenticaseUse = makeAuthenticateUseCase();

		const { user } = await authenticaseUse.execute({
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
