import { db } from "@/lib/database/kysely";

export class UserRepository {
	async findByEmail(email: string) {
		const user = await db
			.selectFrom("users")
			.where("email", "=", email)
			.selectAll()
			.executeTakeFirst();

		return user;
	}
}
