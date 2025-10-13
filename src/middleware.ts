import { NextResponse, type NextRequest } from "next/server"
import { guardAuthentication } from "@/lib/middlewares/authentication"

type MiddleWareFunction = (request: NextRequest) => NextResponse | undefined;
export function middleware(request: NextRequest) {
    const functions: MiddleWareFunction[] = [guardAuthentication];

    for (const checker of functions) {
        const status = checker(request);
        if (status) return status;
    }
    return NextResponse.next();
};

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|login).*)'],
};