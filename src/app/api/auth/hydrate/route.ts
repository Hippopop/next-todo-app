import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/lib/constants/cookie_keys';
import { AuthStateType } from '@/lib/redux/services/authentication/schemas/authentication_state';

/**
 * Hydration endpoint that reads the HTTP-only auth cookie and returns user/token data.
 * This allows Redux to restore authentication state from server-validated cookies on app startup.
 * 
 * CURRENT LIMITATION:
 * The cookie currently only stores the access token string (set in LoginForm.tsx line 38).
 * It does NOT store the full user object or complete token object (with refreshToken, expiresAt).
 * 
 * This means redux-persist (localStorage) is the PRIMARY persistence mechanism.
 * This endpoint serves as a FALLBACK for when localStorage is cleared but cookie remains.
 * 
 * FUTURE IMPROVEMENTS:
 * To make this endpoint fully functional, you have several options:
 * 
 * Option 1: Decode JWT and extract user data
 *   - Install jsonwebtoken library
 *   - Decode the access token
 *   - Extract user info from token payload
 *   - Return constructed AuthStateType
 * 
 * Option 2: Store full auth state in cookie
 *   - Update LoginForm to store entire AuthStateType as JSON in cookie
 *   - Parse it here and return
 *   - Caveat: Increases cookie size significantly
 * 
 * Option 3: Fetch from backend
 *   - Use the token to call your backend /auth/me or /auth/verify endpoint
 *   - Fetch fresh user data
 *   - Return complete AuthStateType
 *   - Caveat: Adds network latency to app startup
 * 
 * Option 4: Accept current limitation
 *   - If user clears localStorage, they need to re-login
 *   - This is acceptable for most applications
 *   - Cookie is used only for middleware authentication checks
 */
export async function GET() {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN);

        // No cookie found - user is not authenticated
        if (!authCookie?.value) {
            return NextResponse.json<AuthStateType>(
                { user: null, token: null },
                { status: 200 }
            );
        }

        // TODO: Implement one of the options above to restore full auth state
        // For now, return empty state - user will need to re-login if localStorage is cleared
        // The cookie will still work for middleware authentication checks

        return NextResponse.json<AuthStateType>(
            {
                user: null,
                token: null
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('[AUTH_HYDRATION_ERROR]:', error);

        // On error, return empty auth state (user stays logged out)
        return NextResponse.json<AuthStateType>(
            { user: null, token: null },
            { status: 200 }
        );
    }
}
