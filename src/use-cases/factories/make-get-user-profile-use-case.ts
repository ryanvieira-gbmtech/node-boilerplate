import { UserRepository } from "@/repositories/user.repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
	const userRepository = new UserRepository();
	return new GetUserProfileUseCase(userRepository);
}
