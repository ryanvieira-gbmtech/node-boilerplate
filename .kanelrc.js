require("dotenv").config();

const { kyselyCamelCaseHook, makeKyselyHook, kyselyTypeFilter } = require("kanel-kysely");

/** @type {import('kanel').Config} */
module.exports = {
	connection: {
		connectionString: process.env.DATABASE_URL,
	},
	schemas: ["public"],
	typeFilter: kyselyTypeFilter,
	preDeleteOutputFolder: true,
	outputPath: "./src/lib/database/schema",
	preRenderHooks: [makeKyselyHook(), kyselyCamelCaseHook],
};
