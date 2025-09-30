import type { FastifyReply, FastifyRequest } from "fastify";
import { getUserProfileUseCase } from "@/use-cases/get-user-profile";

export async function getUserProfileHandler(request: FastifyRequest, reply: FastifyReply) {
	const { user } = await getUserProfileUseCase({
		id: Number(request.user.sub),
	});

	return reply.status(200).send({
		user: {
			...user,
			password: undefined,
		},
	});
}
