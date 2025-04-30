import { randomUUID } from "node:crypto";
import { changeDatabaseURL, deleteSchema } from "./database/migrator";

const schema = randomUUID();

beforeAll(async () => {
	await changeDatabaseURL(schema);
});

afterAll(async () => {
	await deleteSchema(schema);
});
