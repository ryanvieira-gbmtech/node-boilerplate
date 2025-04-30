import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { mockUserRepository } from "@/utils/test";
import bcryptjs from "bcryptjs";

// Mock bcryptjs
jest.mock("bcryptjs", () => ({
	compare: jest.fn(),
}));

let sut: AuthenticateUseCase;

const mockUser = {
	name: "John Doe",
	email: "john@doe.com",
	password: "hashed_password",
};

describe("Authenticate UseCase", () => {
	beforeEach(() => {
		sut = new AuthenticateUseCase(mockUserRepository);
		jest.resetAllMocks();
	});

	it("should be able to authenticate a user", async () => {
		mockUserRepository.findByEmail.mockResolvedValueOnce(mockUser);
		(bcryptjs.compare as jest.Mock).mockResolvedValueOnce(true);

		const result = await sut.execute({
			email: "john@doe.com",
			password: "123456",
		});

		expect(result.user).toEqual(mockUser);
		expect(bcryptjs.compare).toHaveBeenCalledWith("123456", "hashed_password");
	});

	it("should throw ResourceNotFoundError if user does not exist", async () => {
		mockUserRepository.findByEmail.mockResolvedValueOnce(null);

		await expect(
			sut.execute({
				email: "nonexistent@user.com",
				password: "123456",
			}),
		).rejects.toThrow(ResourceNotFoundError);
	});

	it("should throw InvalidCredentialsError if password is incorrect", async () => {
		mockUserRepository.findByEmail.mockResolvedValueOnce(mockUser);
		(bcryptjs.compare as jest.Mock).mockResolvedValueOnce(false);

		await expect(
			sut.execute({
				email: "john@doe.com",
				password: "wrong_password",
			}),
		).rejects.toThrow(InvalidCredentialsError);
	});
});
