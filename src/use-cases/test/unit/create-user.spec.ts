import { CreateUserUseCase } from "@/use-cases/create-user";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { mockUserRepository } from "@/utils/test";

let sut: CreateUserUseCase;

const mockUser = {
	name: "John Doe",
	email: "john@doe.com",
	password: "123456",
};

describe("CreateUser UseCase", () => {
	beforeEach(() => {
		sut = new CreateUserUseCase(mockUserRepository);

		jest.resetAllMocks();
	});

	it("should be able to create a user", async () => {
		await sut.execute(mockUser);

		expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
		expect(mockUserRepository.create).toHaveBeenCalledWith(
			expect.objectContaining({
				...mockUser,
				password: expect.any(String),
			}),
		);
	});

	it("should not be able to create a user with an existing email", async () => {
		mockUserRepository.findByEmail.mockResolvedValueOnce({
			id: "any_id",
			name: "John Doe",
			email: "john@doe.com",
		});

		await expect(sut.execute(mockUser)).rejects.toThrow(UserAlreadyExistsError);
	});
});
