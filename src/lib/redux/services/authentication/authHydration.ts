import { AppDispatch } from '../../store';
import { setAppTokenState, setAppUserState } from './authenticationService';
import { AuthStateType } from './schemas/authentication_state';

/**
 * Hydrates Redux authentication state from server-validated cookies.
 * Called on app initialization to restore user session.
 * 
 * @param dispatch - Redux dispatch function
 * @returns Promise<boolean> - true if hydration succeeded, false otherwise
 */
export async function hydrateAuthState(dispatch: AppDispatch): Promise<boolean> {
    try {
        const response = await fetch('/api/auth/hydrate', {
            method: 'GET',
            credentials: 'include', // Include cookies in request
        });

        if (!response.ok) {
            console.warn('[AUTH_HYDRATION]: Failed to hydrate auth state');
            return false;
        }

        const data: AuthStateType = await response.json();

        // If we have valid user and token data, restore to Redux
        if (data.user && data.token) {
            dispatch(setAppUserState(data.user));
            dispatch(setAppTokenState(data.token));
            console.log('[AUTH_HYDRATION]: Successfully hydrated auth state');
            return true;
        }

        // No auth data available (user not logged in)
        return false;

    } catch (error) {
        console.error('[AUTH_HYDRATION_ERROR]:', error);
        return false;
    }
}
