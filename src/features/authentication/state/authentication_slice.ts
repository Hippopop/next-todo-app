import { LoginFormState } from '../schemas/login_form_state';
import { RegistrationFormState } from '../schemas/registration_form_state';
import { createApi } from '@reduxjs/toolkit/query/react';
import { rtkBaseQuery } from '@/lib/api/baseQuery';
import { AuthStateSchema } from '@/lib/redux/services/authentication/schemas/authentication_state';
import { ResponseWrapperSchema } from '@/lib/api/models/response';
import z from 'zod';

// interface AuthenticationState {
//     loginState?: LoginFormState;
//     registrationState?: RegistrationFormState;
// }

// const initialState: AuthenticationState = {}

// export const authenticationSlice = createSlice({
//     name: 'authentication',
//     initialState,
//     reducers: {
//         login: (state, action: PayloadAction<LoginFormState>) => {

//         },
//         registration: (state, action: PayloadAction<RegistrationFormState>) => {

//         }
//     }
// });

const AuthResponseSchema = ResponseWrapperSchema(AuthStateSchema);
type AuthResponseType = z.infer<typeof AuthResponseSchema>;


export const authenticationSlice = createApi({
    reducerPath: 'authentication',
    baseQuery: rtkBaseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponseType, LoginFormState>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                data: credentials,
                responseSchema: AuthResponseSchema,
            }),
        }),
        registration: builder.mutation<AuthResponseType, RegistrationFormState>({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                data: credentials,
                responseSchema: AuthResponseSchema,
            }),
        }),
    }),
});

export default authenticationSlice.reducer
export const { useLoginMutation, useRegistrationMutation } = authenticationSlice;