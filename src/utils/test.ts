import type { UserRepository } from "@/repositories/user.repository";

export const mockUserRepository: UserRepository = {
	findByEmail: jest.fn(),
	create: jest.fn(),
};
