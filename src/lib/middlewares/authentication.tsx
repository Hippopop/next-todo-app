import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ROUTES } from "@/lib/constants/paths";
import { COOKIE_KEYS } from "@/lib/constants/cookie_keys";

export function guardAuthentication(request: NextRequest) {
    const tokenCookie = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);

    const hasUser = tokenCookie?.value /* || true */;
    if (!hasUser) return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    return NextResponse.next();
}
