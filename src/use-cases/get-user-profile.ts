import type { Users } from "@/lib/database/schema/public/Users";
import type { UserRepository } from "@/repositories/user.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
	id: number;
}

interface GetUserProfileUseCaseResponse {
	user: Users;
}

export class GetUserProfileUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ id }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return { user };
	}
}
