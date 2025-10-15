import z from "zod";
import { StatusSchema } from "./status";
import { SimpleErrorSchema } from "./error";

export const AsyncState = <T extends z.ZodTypeAny>(dataSchema?: T) =>
    z.object({
        status: StatusSchema,
        msg: z.string().nullish(),
        error: z.array(SimpleErrorSchema).nullish(),
        state: (dataSchema ?? z.object({})).nullish(),
    }).strict();

export type AsyncStateType<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof AsyncState<T>>>;