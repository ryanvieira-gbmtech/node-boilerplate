import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { routes } from "./http/controllers/routes";
import { registerAllPlugins } from "./plugins";

export const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

registerAllPlugins(app);

app.register(routes, { prefix: "/api" });
