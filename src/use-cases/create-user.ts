import bcryptjs from "bcryptjs";
import type { Users } from "@/database/schema/public/Users";
import { create, findByEmail } from "@/repositories/user.repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface CreateUserUseCaseResponse {
	user: Omit<Users, "password">;
}

export async function createUserUseCase(filter: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
	const { name, email, password } = filter;

	const userExists = await findByEmail(email);

	if (userExists) {
		throw new UserAlreadyExistsError();
	}

	const salt = await bcryptjs.genSalt(10);
	const newPassword = await bcryptjs.hash(password, salt);

	const user = await create({
		name,
		email,
		password: newPassword,
	});

	return {
		user,
	};
}
