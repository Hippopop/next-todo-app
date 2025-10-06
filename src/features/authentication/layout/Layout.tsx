"use client";

import React, { FC } from 'react';
import { AuthRootLayoutProps } from '../types/auth_types';
import { AuthProvider } from '../providers/AuthContextProvider';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { FieldDescription } from '@/components/ui/shadcn/field';
import { GalleryVerticalEnd } from 'lucide-react';
import { ROUTES } from '@/lib/constants/paths';


export const AuthRootLayout: FC<AuthRootLayoutProps> = ({ children, image }) => {
    return (
        <div>
            <div className="fixed top-0 left-0 w-full z-10 flex justify-center gap-2 md:justify-start p-3 md:p-5">
                <a href={ROUTES.HOME} className="flex items-center gap-2 font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Mos-Todo.
                </a>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <div className={"flex flex-col gap-6"}>
                        <Card className="overflow-hidden p-0">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <div className="p-6 md:p-8">
                                    {children}
                                </div>
                                <div className="bg-muted relative hidden md:block">
                                    {image}
                                </div>
                            </CardContent>
                        </Card>
                        <FieldDescription className="px-6 text-center">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </FieldDescription>
                    </div>
                </div>
            </div>
        </div>





    );
};

const AuthRootLayoutWithProvider = ({ children, image }: AuthRootLayoutProps) => (
    <AuthProvider>
        <AuthRootLayout image={image} >{children}</AuthRootLayout>
    </AuthProvider>
);

export default AuthRootLayoutWithProvider;