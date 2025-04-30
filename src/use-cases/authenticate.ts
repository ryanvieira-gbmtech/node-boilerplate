import type { Users } from "@/lib/database/schema/public/Users";
import type { UserRepository } from "@/repositories/user.repository";
import bcryptjs from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: Users;
}

export class AuthenticateUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const passwordMatch = await bcryptjs.compare(password, user.password);

		if (!passwordMatch) {
			throw new InvalidCredentialsError();
		}

		return { user };
	}
}
