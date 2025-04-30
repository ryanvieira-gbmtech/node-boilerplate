import "dotenv/config";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const EnvSchema = Type.Object({
	NODE_ENV: Type.Union([Type.Literal("development"), Type.Literal("production")], {
		default: "development",
	}),
	DATABASE_URL: Type.String({ pattern: "^postgres://.*" }),
	TZ: Type.String({ default: "UTC" }),
	PORT: Type.Number({ default: 3000 }),
	JWT_SECRET: Type.String(),
});

export const env = Value.Parse(EnvSchema, process.env);
