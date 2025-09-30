import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl";
import { Pool } from "pg";

export default defineConfig({
	dialect: "pg",
	dialectConfig: {
		pool: new Pool({ connectionString: process.env.DATABASE_URL }),
	},
	migrations: {
		migrationFolder: "src/database/migrations",
		getMigrationPrefix: getKnexTimestampPrefix,
		migrationTableSchema: "public",
	},
	seeds: {
		seedFolder: "src/database/seeds",
		getSeedPrefix: getKnexTimestampPrefix,
	},
});
