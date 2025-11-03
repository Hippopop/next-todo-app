import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ROUTES } from "@/lib/constants/paths";
import { COOKIE_KEYS } from "@/lib/constants/cookie_keys";

export function guardAuthentication(request: NextRequest): NextResponse | undefined {
    const currentPath = request.nextUrl.pathname;
    const authenticationOptions = [ROUTES.LOGIN, ROUTES.REGISTRATION];

    const tokenCookie = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);

    const hasUser = tokenCookie?.value /* || true */;
    const onAuthentication = authenticationOptions.some((path) => currentPath.startsWith(path));
    if (!hasUser && !onAuthentication) { console.log("[AUTH_GUARD] : Returning to Login."); return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url)); }
    if (hasUser && onAuthentication) { console.log("[AUTH_GUARD] : Returning to Home."); return NextResponse.redirect(new URL(ROUTES.HOME, request.url)); }
}
