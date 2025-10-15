import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthenticationState } from '../schemas/authentication_state'
import { LoginFormState } from '../schemas/login_form_state';


const initialState: AuthenticationState = { status: 'idle' };

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginFormState>) => {
            console.log('Received State', state);
            console.log('Logging in with', action.payload);
        },
    }
});

export default authenticationSlice.reducer
export const { login } = authenticationSlice.actions