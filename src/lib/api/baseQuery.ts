import { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import axiosInstance from './axiosClient';
import { ResponseWrapperSchema } from './models/response';
import z, { ZodType } from 'zod';
import { SimpleError } from './models/error';
import { SerializedError } from '@reduxjs/toolkit';

type BaseQueryArgs = {
    url: string;
    data?: AxiosRequestConfig['data'];
    method?: AxiosRequestConfig['method'];
    params?: AxiosRequestConfig['params'];
    responseSchema: ZodType;
};

const ResponseErrorSchema = ResponseWrapperSchema().omit({ data: true }).required({ error: true });
type ResponseErrorType = z.infer<typeof ResponseErrorSchema>;

export function convertAPIError(error: ResponseErrorType | SerializedError | FetchBaseQueryError): SimpleError {
    if (ResponseErrorSchema.safeParse(error).success && (error as ResponseErrorType).error && (error as ResponseErrorType).error!.length > 0)
        return (error as ResponseErrorType).error![0];
    return { codes: "unknown", description: (error as SerializedError).message ?? "[ERROR] : Unknown response error format!" };
}


export const rtkBaseQuery: BaseQueryFn<
    BaseQueryArgs,
    unknown,
    ResponseErrorType
> =
    async ({ url, method, data, params, responseSchema }, { signal }) => {
        try {
            const result = await axiosInstance({ url, method, data, params, signal });

            const safeData = responseSchema.safeParse(result.data);
            //NOTE: Structure error return!
            if (safeData.error) return {
                error: {
                    status: result.status ?? 0,
                    msg: result.data?.msg ?? "[ERROR] : Unknown response error format!",
                    error: [{ codes: result?.status ?? 0, description: result.data?.msg ?? "[ERROR] : Unknown response error format!" }],
                }
            }
            return { data: safeData.data }; //NOTE: Only successful return!
        } catch (axiosError) {
            console.log("[AXIOS_ERROR] : ", axiosError);
            const errData = ResponseErrorSchema.safeParse(axiosError);
            //NOTE: Valid error return!
            console.log("Parse Two: ", errData.success);
            if (errData.success) return { error: errData.data };
            else {
                console.log("[RTKQ_ERROR] : ", errData.error);
                const err = axiosError as AxiosError;
                //NOTE: Unknown error return!
                return {
                    error: {
                        data: null,
                        status: err.status ?? 0,
                        msg: err.message ?? "[ERROR] : Unknown response error format!",
                        error: [{ codes: err.response?.status ?? 0, description: err.message ?? "[ERROR] : Unknown response error format!" }],
                    } as ResponseErrorType,
                };
            }
        }
    };