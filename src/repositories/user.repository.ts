import { db } from "@/lib/database/kysely";
import type { NewUsers } from "@/lib/database/schema/public/Users";

export class UserRepository {
	async create(user: NewUsers) {
		const newUser = await db
			.insertInto("users")
			.values(user)
			.returningAll()
			.executeTakeFirstOrThrow();

		return newUser;
	}

	async findByEmail(email: string) {
		const user = await db
			.selectFrom("users")
			.where("email", "=", email)
			.selectAll()
			.executeTakeFirst();

		return user;
	}
}
