import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRootState } from '../../store';
import { AuthStateType, AuthTokenType, UserType } from './schemas/authentication_state';

const _initialState: AuthStateType = {};
export const appAuthenticationState = createSlice({
    name: 'appAuthentication',
    initialState: _initialState,
    reducers: {
        logout: (state) => { state = _initialState; console.log('Logged out! State : ', state); },
        setAppUserState: (
            state: AuthStateType,
            action: PayloadAction<UserType>
        ) => { state.user = action.payload; },
        setAppTokenState: (
            state: AuthStateType,
            action: PayloadAction<AuthTokenType>
        ) => { state.token = action.payload; },
    },
});

export const { setAppUserState, setAppTokenState, logout } = appAuthenticationState.actions;

export const selectCurrentUser = (state: AppRootState) => state.appAuthenticationState.user;
export const selectCurrentToken = (state: AppRootState) => state.appAuthenticationState.token;
export const selectIsAuthenticated = (state: AppRootState): boolean =>
    (state.appAuthenticationState?.user !== null || state.appAuthenticationState?.user !== undefined) &&
    (state.appAuthenticationState?.token !== undefined && state.appAuthenticationState?.token !== null);


export default appAuthenticationState.reducer;
