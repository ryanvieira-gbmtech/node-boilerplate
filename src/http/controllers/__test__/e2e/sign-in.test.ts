import { app } from "@/app";
import request from "supertest";

describe("Sign In (E2E)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to sign in", async () => {
		await request(app.server).post("/api/users").send({
			name: "Test",
			email: "test@test.com",
			password: "123456",
		});

		const response = await request(app.server).post("/api/sign-in").send({
			email: "test@test.com",
			password: "123456",
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
