import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { mockUserRepository } from "@/utils/test";

let sut: GetUserProfileUseCase;

const mockUser = {
	name: "John Doe",
	email: "john@doe.com",
	password: "123456",
};

describe("GetUserProfile UseCase", () => {
	beforeEach(() => {
		sut = new GetUserProfileUseCase(mockUserRepository);

		jest.resetAllMocks();
	});

	it("should be able to get a user profile", async () => {
		mockUserRepository.findById.mockResolvedValueOnce(mockUser);
		const result = await sut.execute({ id: 1 });

		expect(result.user).toEqual(mockUser);
	});

	it("should throw an error if user does not exist", async () => {
		mockUserRepository.findById.mockResolvedValueOnce(null);

		await expect(sut.execute({ id: 1 })).rejects.toThrow(ResourceNotFoundError);
	});
});
