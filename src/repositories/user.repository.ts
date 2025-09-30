import { db } from "@/lib/database/kysely";
import type { NewUsers, UsersId } from "@/lib/database/schema/public/Users";

export async function create(user: NewUsers) {
	const newUser = await db.insertInto("users").values(user).returningAll().executeTakeFirstOrThrow();

	return newUser;
}

export async function findById(id: number) {
	const user = await db
		.selectFrom("users")
		.where("id", "=", id as UsersId)
		.selectAll()
		.executeTakeFirst();

	return user;
}

export async function findByEmail(email: string) {
	const user = await db.selectFrom("users").where("email", "=", email).selectAll().executeTakeFirst();

	return user;
}
