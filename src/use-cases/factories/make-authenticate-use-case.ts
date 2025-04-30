import { UserRepository } from "@/repositories/user.repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
	const userRepository = new UserRepository();
	return new AuthenticateUseCase(userRepository);
}
