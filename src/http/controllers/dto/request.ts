import { type Static, Type } from "@sinclair/typebox";

export const SignInRequest = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

export type SignInRequest = Static<typeof SignInRequest>;
