import { UserRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserUseCase() {
	const userRepository = new UserRepository();
	return new CreateUserUseCase(userRepository);
}
