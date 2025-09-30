import request from "supertest";
import { app } from "@/app";

describe("Create User (E2E)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a user", async () => {
		const response = await request(app.server).post("/api/users").send({
			name: "Test",
			email: "test@test.com",
			password: "123456",
		});

		expect(response.statusCode).toEqual(201);
	});
});
