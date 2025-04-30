import "dotenv/config";

export async function changeDatabaseURL(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not defined");
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set("schema", schema);
}
