'use client'

import React, { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { useAppDispatch, useAppSelector } from './hooks'
import { hydrateAuthState } from './services/authentication/authHydration'

/**
 * Inner component that handles auth hydration from cookies.
 * 
 * Architecture:
 * 1. Redux-persist automatically restores auth state from localStorage (primary mechanism)
 * 2. If localStorage is empty but cookie exists, this hydrator attempts to restore from cookie
 * 3. This provides a fallback when localStorage is cleared but session cookie remains valid
 * 
 * Note: Currently limited because cookie only stores token string, not full user object.
 * For full restoration, you'd need to either:
 * - Store more data in cookies (increases size)
 * - Decode JWT and fetch user data from backend
 * - Accept that clearing localStorage requires re-login (simplest)
 */
function AuthHydrator({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(state => state.appAuthenticationState);
    const hasAttemptedHydration = useRef(false);

    useEffect(() => {
        // Only attempt hydration once, and only if we don't have auth state
        // Redux-persist will restore from localStorage first
        if (hasAttemptedHydration.current) return;
        if (authState.user || authState.token) {
            // State already restored by redux-persist, no need to hydrate
            hasAttemptedHydration.current = true;
            return;
        }

        // At this point, localStorage is empty but cookie might exist
        // Attempt to restore from cookie as fallback
        hasAttemptedHydration.current = true;
        hydrateAuthState(dispatch).then((success) => {
            if (success) {
                console.log('[AUTH_HYDRATOR]: Restored auth state from cookie fallback');
            } else {
                console.log('[AUTH_HYDRATOR]: No valid session found in cookies');
            }
        });
    }, [authState.user, authState.token, dispatch]);

    return <>{children}</>;
}

export default function ReduxStoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AuthHydrator>
                    {children}
                </AuthHydrator>
            </PersistGate>
        </Provider>
    )
}
