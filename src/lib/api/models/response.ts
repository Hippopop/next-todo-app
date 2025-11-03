import z from "zod";
import { SimpleErrorSchema } from "./error";

export const ResponseWrapperSchema = <T extends z.ZodTypeAny>(dataSchema?: T) =>
    z.object({
        status: z.number().int().gt(99).lt(600),
        msg: z.string(),
        error: z.array(SimpleErrorSchema).nullish(),
        data: dataSchema ?? z.object({}).nullish(),
    }).strict();

// export type ResponseWrapperType<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof ResponseWrapperSchema<T>>>;