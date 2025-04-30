import type { Users } from "@/lib/database/schema/public/Users";
import type { UserRepository } from "@/repositories/user.repository";
import bcryptjs from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface CreateUserUseCaseResponse {
	user: Omit<Users, "password">;
}

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(filter: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const { name, email, password } = filter;

		const userExists = await this.userRepository.findByEmail(email);

		if (userExists) {
			throw new UserAlreadyExistsError();
		}

		const salt = await bcryptjs.genSalt(10);
		const newPassword = await bcryptjs.hash(password, salt);

		const { password: _, ...newUser } = await this.userRepository.create({
			name,
			email,
			password: newPassword,
		});

		return {
			user: newUser,
		};
	}
}
