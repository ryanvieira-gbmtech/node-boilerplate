import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";

export const app = fastify().withTypeProvider<TypeBoxTypeProvider>();
