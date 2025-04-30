import { CreateUserUseCase } from "@/use-cases/create-user";
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
});
