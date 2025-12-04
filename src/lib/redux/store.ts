import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import appAuthenticationStateReducer from './services/authentication/authenticationService';
import authentication, { authenticationSlice } from '@/features/authentication/state/authentication_slice';
import cookieServiceReducer, { cookieServiceSlice } from './services/cookies/cookieService';
import todoSliceReducer, { todoSlice } from '@/features/todos/state/todo_slice';

export const store = configureStore({
    reducer: {
        'todos': todoSliceReducer,
        'cookies': cookieServiceReducer,
        'authentication': authentication,
        'appAuthenticationState': appAuthenticationStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authenticationSlice.middleware, cookieServiceSlice.middleware, todoSlice.middleware]),
});

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppRootState = ReturnType<AppStore['getState']>
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, AppRootState, unknown, Action>