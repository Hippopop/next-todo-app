import z from "zod";

export const SimpleErrorSchema = z.object({
    codes: z.string().or(z.number()).or(z.string().or(z.number()).array()),
    description: z.string(),
});

export type SimpleError = z.infer<typeof SimpleErrorSchema>;