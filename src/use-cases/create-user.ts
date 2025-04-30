import type { UserRepository } from "@/repositories/user.repository";
import bcryptjs from "bcryptjs";

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(filter: CreateUserInput) {
		const { name, email, password } = filter;

		const salt = await bcryptjs.genSalt(10);
		const newPassword = await bcryptjs.hash(password, salt);

		const newUser = await this.userRepository.create({
			name,
			email,
			password: newPassword,
		});

		return {
			user: newUser,
		};
	}
}
