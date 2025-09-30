import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const EnvSchema = Type.Object({
	NODE_ENV: Type.Union([Type.Literal("development"), Type.Literal("production"), Type.Literal("test")], {
		default: "development",
	}),
	DATABASE_URL: Type.String({ pattern: "^postgres://.*" }),
	TZ: Type.String({ default: "UTC" }),
	PORT: Type.Number({ default: 3000 }),
	JWT_SECRET: Type.String(),
});

if (!Value.Check(EnvSchema, process.env)) {
	const errors = Value.Errors(EnvSchema, process.env);

	console.error(errors.First());

	throw new Error(`Invalid environment variables: ${errors.First()}`);
}

export const env = Value.Parse(EnvSchema, process.env);
