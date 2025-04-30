import { type Static, Type } from "@sinclair/typebox";

export const SignInRequest = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

export type SignInRequest = Static<typeof SignInRequest>;

export const CreateUserRequest = Type.Object({
	name: Type.String(),
	email: Type.String({ format: "email" }),
	password: Type.String(),
});

export type CreateUserRequest = Static<typeof CreateUserRequest>;
