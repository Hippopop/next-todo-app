import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CookieRequestType, CookieResponseType } from './schemas/cookieRequests';

export const cookieServiceSlice = createApi({
    reducerPath: 'cookies',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({

        setCookie: builder.mutation<CookieResponseType, CookieRequestType>({
            query: (data) => ({
                url: 'api/cookies',
                method: 'POST',
                body: data,
            }),
        }),

        clearCookie: builder.mutation<CookieResponseType, string>({
            query: (key) => ({
                url: 'api/cookies',
                method: 'DELETE',
                body: { key },
            }),
        }),
    }),
});

export default cookieServiceSlice.reducer;
export const { useSetCookieMutation, useClearCookieMutation } = cookieServiceSlice;
