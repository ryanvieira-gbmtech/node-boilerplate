import type { UserRepository } from "@/repositories/user.repository";
import bcryptjs from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(filter: CreateUserInput) {
		const { name, email, password } = filter;

		const userExists = await this.userRepository.findByEmail(email);

		if (userExists) {
			throw new UserAlreadyExistsError();
		}

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
