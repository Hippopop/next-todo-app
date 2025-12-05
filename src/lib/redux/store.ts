import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import appAuthenticationStateReducer from './services/authentication/authenticationService';
import authentication, { authenticationSlice } from '@/features/authentication/state/authentication_slice';
import cookieServiceReducer, { cookieServiceSlice } from './services/cookies/cookieService';
import todoSliceReducer, { todoSlice } from '@/features/todos/state/todo_slice';

// Redux Persist configuration for authentication state
const authPersistConfig = {
    key: 'appAuthenticationState',
    storage,
    // Only persist the appAuthenticationState slice
    // This keeps user and token data across page refreshes
};

// Wrap the authentication reducer with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, appAuthenticationStateReducer);

export const store = configureStore({
    reducer: {
        'todos': todoSliceReducer,
        'cookies': cookieServiceReducer,
        'authentication': authentication,
        'appAuthenticationState': persistedAuthReducer, // Use persisted version
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions that contain non-serializable values
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat([authenticationSlice.middleware, cookieServiceSlice.middleware, todoSlice.middleware]),
});

// Create persistor for use with PersistGate
export const persistor = persistStore(store);

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppRootState = ReturnType<AppStore['getState']>
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, AppRootState, unknown, Action>