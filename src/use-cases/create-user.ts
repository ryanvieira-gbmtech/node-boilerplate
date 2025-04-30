import type { UserRepository } from "@/repositories/user.repository";

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(_filter: CreateUserInput) {}
}
