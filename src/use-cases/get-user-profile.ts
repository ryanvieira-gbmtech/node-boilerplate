import type { Users } from "@/database/schema/public/Users";
import { findById } from "@/repositories/user.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
	id: number;
}

interface GetUserProfileUseCaseResponse {
	user: Users;
}

export async function getUserProfileUseCase({
	id,
}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
	const user = await findById(id);

	if (!user) {
		throw new ResourceNotFoundError();
	}

	return { user };
}
