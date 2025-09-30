import bcryptjs from "bcryptjs";
import type { Users } from "@/database/schema/public/Users";
import { findByEmail } from "@/repositories/user.repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: Users;
}

export async function authenticateUseCase({
	email,
	password,
}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
	const user = await findByEmail(email);

	if (!user) {
		throw new ResourceNotFoundError();
	}

	const passwordMatch = await bcryptjs.compare(password, user.password);

	if (!passwordMatch) {
		throw new InvalidCredentialsError();
	}

	return { user };
}
