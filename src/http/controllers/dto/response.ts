import { Type } from "@sinclair/typebox";

export const SignInResponse = Type.Object({
	token: Type.String(),
});
