import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserRequest } from "./dto/request";

export async function createUser(
	request: FastifyRequest<{ Body: CreateUserRequest }>,
	reply: FastifyReply,
) {
	const { email, name, password } = request.body;

	try {
		const createUserUseCase = makeCreateUserUseCase();

		await createUserUseCase.execute({ email, name, password });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}
	}

	return reply.status(201).send();
}
