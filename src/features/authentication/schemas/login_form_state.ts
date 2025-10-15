import z from "zod";


export const LoginFormSchema = z.object({
    email: z.email("Invalid email address.").min(1, "Email is required!"),
    password: z.string().min(1, "Password is required!").min(8, "Password must be at least 8 characters long."),
});

export type LoginFormState = z.infer<typeof LoginFormSchema>;