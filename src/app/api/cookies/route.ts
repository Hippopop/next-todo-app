import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CookieRequestSchema, CookieResponseType } from '@/lib/redux/services/cookies/schemas/cookieRequests';


export async function DELETE(request: Request) {
    try {
        const { key }: { key: string } = await request.json();

        if (key) {
            const cookieStore = await cookies();
            cookieStore.delete(key);
        } else {
            return NextResponse.json<CookieResponseType>(
                { success: false, message: "Key wasn't provided!" },
                { status: 400 }
            )
        }

        return NextResponse.json<CookieResponseType>(
            { success: true, message: `Your cookie is deleted! (key: ${key})` },
            { status: 200 }
        );
    } catch (error) {
        console.log("[COOKIE_DELETE_ERROR] : ", error);
        return NextResponse.json<CookieResponseType>(
            { success: false, message: 'Failed to delete auth cookie!' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const requestCheck = CookieRequestSchema.safeParse(body);
        if (requestCheck.success) {
            const cookieStore = await cookies();
            cookieStore.set(requestCheck.data.key, requestCheck.data.value, {
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                path: requestCheck.data.options?.path,
                maxAge: requestCheck.data.options?.maxAge,
                httpOnly: requestCheck.data.options?.httpOnly ?? true,
            });
        } else {
            console.log("[COOKIE_SET_ERROR] : ", requestCheck.error);
            return NextResponse.json<CookieResponseType>(
                { success: false, message: "Invalid request data!" },
                { status: 400 }
            )
        }

        return NextResponse.json<CookieResponseType>(
            { success: true, message: `Your cookie is set! (key: ${requestCheck.data!.key})` },
            { status: 200 }
        );
    } catch (error) {
        console.log("[COOKIE_SET_ERROR] : ", error);
        return NextResponse.json<CookieResponseType>(
            { success: false, message: 'Failed to set auth cookie!' },
            { status: 500 }
        );
    }
}


