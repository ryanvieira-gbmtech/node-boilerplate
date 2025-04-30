import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
	preset: "ts-jest",
	rootDir: "..",
	coverageProvider: "v8",
	roots: ["<rootDir>/src"],
	verbose: true,
	passWithNoTests: true,
	collectCoverage: false,
	testEnvironment: "node",
	testMatch: ["<rootDir>/src/**/test/e2e/*.test.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/test/setup-e2e.ts"],
};

export default config;
