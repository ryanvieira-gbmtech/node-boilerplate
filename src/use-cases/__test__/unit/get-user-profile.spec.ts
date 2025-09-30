import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { getUserProfileUseCase } from "@/use-cases/get-user-profile";

// Mock the repository functions
jest.mock("@/repositories/user.repository", () => ({
	findById: jest.fn(),
}));

const mockFindById = require("@/repositories/user.repository").findById;

const mockUser = {
	name: "John Doe",
	email: "john@doe.com",
	password: "123456",
};

describe("GetUserProfile UseCase", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should be able to get a user profile", async () => {
		mockFindById.mockResolvedValueOnce(mockUser);
		const result = await getUserProfileUseCase({ id: 1 });

		expect(result.user).toEqual(mockUser);
	});

	it("should throw an error if user does not exist", async () => {
		mockFindById.mockResolvedValueOnce(null);

		await expect(getUserProfileUseCase({ id: 1 })).rejects.toThrow(ResourceNotFoundError);
	});
});
