import type { NextRequest } from "next/server"

import { ROUTES } from "@/lib/constants/paths";
import { guardAuthentication } from "@/lib/middlewares/authentication"

export function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;
    const authenticationOptions = [ROUTES.LOGIN, ROUTES.REGISTRATION];

    if (!authenticationOptions.some((path) => currentPath.startsWith(path))) {
        return guardAuthentication(request);
    }
};

export const config = {
    matcher: ['/((?!_next|static|favicon.ico).*)'],
};