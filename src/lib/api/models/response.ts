import z, { ZodType } from "zod";
import { SimpleErrorSchema } from "./error";
import { AxiosRequestConfig } from "axios";

export type BaseQueryArgs = {
    url: string;
    data?: AxiosRequestConfig['data'];
    method?: AxiosRequestConfig['method'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
    responseSchema: ZodType;
};

export const ResponseWrapperSchema = <T extends z.ZodType>(dataSchema?: T) =>
    z.object({
        status: z.number().int().gt(99).lt(600),
        msg: z.string(),
        error: z.array(SimpleErrorSchema).nullish(),
        data: (dataSchema) ? dataSchema : z.object({}).nullish(),
    });

export const ResponseErrorSchema = ResponseWrapperSchema().omit({ data: true }).extend({ error: ResponseWrapperSchema().shape.error.unwrap().unwrap() });
export type ResponseErrorType = z.infer<typeof ResponseErrorSchema>;