import { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { AxiosError } from 'axios';
import axiosInstance from './axiosClient';
import { SimpleError } from './models/error';
import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryArgs, ResponseErrorSchema, ResponseErrorType, ResponseWrapperSchema } from './models/response';
import { AppRootState } from '../redux/store';
import { Mutex } from 'async-mutex';
import { AuthTokenSchema } from '../redux/services/authentication/schemas/authentication_state';
import { logout, setAppTokenState } from '../redux/services/authentication/authenticationService';

export function convertAPIError(error: ResponseErrorType | SerializedError | FetchBaseQueryError): SimpleError {
    if (ResponseErrorSchema.safeParse(error).success && (error as ResponseErrorType).error && (error as ResponseErrorType).error!.length > 0)
        return (error as ResponseErrorType).error![0];
    return { codes: "unknown", description: (error as SerializedError).message ?? "[ERROR] : Unknown response error format!" };
}

const retryMutex = new Mutex();
export const rtkBaseQuery: BaseQueryFn<
    BaseQueryArgs,
    unknown,
    ResponseErrorType
> =
    async ({ url, method, data, params, headers, responseSchema }, { signal, getState, dispatch }) => {
        try {
            const token = (getState() as AppRootState).appAuthenticationState.token?.token;
            console.log("[TOKEN_STATE] : ", token);
            if (token) headers = { ...headers, Authorization: `Bearer ${token}` };

            let result = await axiosInstance({ url, method, data, params, headers, signal });

            if (result.status === 400) {
                if (retryMutex.isLocked()) {
                    await retryMutex.waitForUnlock();
                    const token = (getState() as AppRootState).appAuthenticationState.token?.token;
                    if (token) headers = { ...headers, Authorization: `Bearer ${token}` };

                    result = await axiosInstance({ url, method, data, params, headers, signal });
                } else {
                    const unHold = await retryMutex.acquire();
                    try {
                        const tokenResult = await axiosInstance.post(
                            '/auth/refresh-token',
                            { refreshToken: (getState() as AppRootState).appAuthenticationState?.token?.refreshToken, }
                        );

                        const tokenSchema = ResponseWrapperSchema().extend({ data: AuthTokenSchema });
                        const tokenData = tokenSchema.safeParse(tokenResult.data);
                        if (tokenData.success) {
                            dispatch(setAppTokenState(tokenData.data.data));
                            headers = { ...headers, Authorization: `Bearer ${tokenData.data.data.token}` };
                            result = await axiosInstance({ url, method, data, params, headers, signal });
                        } else throw tokenResult.data;
                    } catch (error) {
                        dispatch(logout());
                        throw error;
                    } finally { unHold(); }
                }
            }
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