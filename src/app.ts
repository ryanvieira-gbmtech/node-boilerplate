import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { registerAllPlugins } from "./plugins";

export const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

registerAllPlugins(app);
