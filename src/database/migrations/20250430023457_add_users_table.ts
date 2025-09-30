import { type Kysely, sql } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("users")
		.ifNotExists()
		.addColumn("id", "serial", (col) => col.primaryKey().notNull())
		.addColumn("name", "varchar", (col) => col.notNull())
		.addColumn("email", "varchar", (col) => col.notNull())
		.addColumn("password", "varchar", (col) => col.notNull())
		.addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
		.addColumn("updated_at", "timestamp", (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
		.execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("users").ifExists().execute();
}
