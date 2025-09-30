import bcryptjs from "bcryptjs";
import { authenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

// Mock the repository functions
jest.mock("@/repositories/user.repository", () => ({
	findByEmail: jest.fn(),
}));

// Mock bcryptjs
jest.mock("bcryptjs", () => ({
	compare: jest.fn(),
}));

const mockFindByEmail = require("@/repositories/user.repository").findByEmail;

const mockUser = {
	name: "John Doe",
	email: "john@doe.com",
	password: "hashed_password",
};

describe("Authenticate UseCase", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should be able to authenticate a user", async () => {
		mockFindByEmail.mockResolvedValueOnce(mockUser);
		(bcryptjs.compare as jest.Mock).mockResolvedValueOnce(true);

		const result = await authenticateUseCase({
			email: "john@doe.com",
			password: "123456",
		});

		expect(result.user).toEqual(mockUser);
		expect(bcryptjs.compare).toHaveBeenCalledWith("123456", "hashed_password");
	});

	it("should throw ResourceNotFoundError if user does not exist", async () => {
		mockFindByEmail.mockResolvedValueOnce(null);

		await expect(
			authenticateUseCase({
				email: "nonexistent@user.com",
				password: "123456",
			}),
		).rejects.toThrow(ResourceNotFoundError);
	});

	it("should throw InvalidCredentialsError if password is incorrect", async () => {
		mockFindByEmail.mockResolvedValueOnce(mockUser);
		(bcryptjs.compare as jest.Mock).mockResolvedValueOnce(false);

		await expect(
			authenticateUseCase({
				email: "john@doe.com",
				password: "wrong_password",
			}),
		).rejects.toThrow(InvalidCredentialsError);
	});
});
