import { type Static, Type } from "@sinclair/typebox";

export const SignInBodyRequest = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

export type SignInBodyRequest = Static<typeof SignInBodyRequest>;
