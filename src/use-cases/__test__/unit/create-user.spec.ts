import { createUserUseCase } from "@/use-cases/create-user";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

// Mock the repository functions
jest.mock("@/repositories/user.repository", () => ({
	create: jest.fn(),
	findByEmail: jest.fn(),
}));

const mockCreate = require("@/repositories/user.repository").create;
const mockFindByEmail = require("@/repositories/user.repository").findByEmail;

const mockUser = {
	name: "John Doe",
	email: "john@doe.com",
	password: "123456",
};

describe("CreateUser UseCase", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should be able to create a user", async () => {
		mockFindByEmail.mockResolvedValueOnce(null);
		mockCreate.mockResolvedValueOnce(mockUser);

		await createUserUseCase(mockUser);

		expect(mockCreate).toHaveBeenCalledTimes(1);
		expect(mockCreate).toHaveBeenCalledWith(
			expect.objectContaining({
				...mockUser,
				password: expect.any(String),
			}),
		);
	});

	it("should not be able to create a user with an existing email", async () => {
		mockFindByEmail.mockResolvedValueOnce({
			id: "any_id",
			name: "John Doe",
			email: "john@doe.com",
		});

		await expect(createUserUseCase(mockUser)).rejects.toThrow(UserAlreadyExistsError);
	});
});
