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
	testMatch: ["<rootDir>/src/**/__test__/unit/*.spec.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};

export default config;
