import type { FastifyInstance } from "fastify";
import { registerAuthPlugins } from "./auth";
import { registerSecurityPlugins } from "./security";
import { registerSwaggerPlugins } from "./swagger";

export async function registerAllPlugins(app: FastifyInstance) {
	await Promise.all([registerAuthPlugins(app), registerSwaggerPlugins(app), registerSecurityPlugins(app)]);
}
