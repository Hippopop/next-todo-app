import z from "zod";
import { AsyncState } from "@/lib/api/models/async_state";
import { AuthResponseSchema } from "./authentication_response";

export const AuthenticationStateSchema = AsyncState(AuthResponseSchema);

export type AuthenticationState = z.infer<typeof AuthenticationStateSchema>;