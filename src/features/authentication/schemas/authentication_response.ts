import z from "zod";

export const AuthTokenSchema = z.object({
    token: z.string(),
    refreshToken: z.string(),
    expiresAt: z.iso.datetime({ offset: true }),
});

export const UserSchema = z.object({
    uid: z.number(),
    uuid: z.string().uuid("Invalid UUID!"),
    photo: z.string().optional().nullable(),
    birthdate: z.iso.datetime().optional().nullable(),
    email: z.email("Please provide a valid email."),
    phone: z.string().min(10, "Phone must be at least 10 characters long.").nullable(),
    name: z.string().min(3, "Username must be at least 3 characters long.").optional().nullable(),
});

export const AuthResponseSchema = z.object({
    user: UserSchema.required(),
    token: AuthTokenSchema.required(),
}).required();


export type AuthToken = z.infer<typeof AuthTokenSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type AuthResponseType = z.infer<typeof AuthResponseSchema>;
