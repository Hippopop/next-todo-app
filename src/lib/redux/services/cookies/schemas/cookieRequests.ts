import z from "zod";

export const CookieRequestSchema = z.object({
    value: z.string(),
    key: z.string().max(255),
    options: z.object({
        maxAge: z.number().optional(),
        path: z.string().max(255).optional(),
        httpOnly: z.boolean().optional().default(true),
    }).nullish(),
})

export const CookieResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
})

export type CookieRequestType = z.infer<typeof CookieRequestSchema>
export type CookieResponseType = z.infer<typeof CookieResponseSchema>