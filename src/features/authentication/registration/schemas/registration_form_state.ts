import z from "zod";


export const RegistrationFormSchema = z.object({
    email: z.email("Invalid email address.").min(1, "Email is required!"),
    password: z.string().min(1, "Password is required!").min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password!"),
}).refine((data) => (data.password === data.confirmPassword ? true : "Password didn't match!"));

export type RegistrationFormState = z.infer<typeof RegistrationFormSchema>;