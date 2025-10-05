"use client";

import React, { FC, ReactNode } from 'react';
import { AuthRootLayoutProps } from '../types/auth_types';
import { AuthProvider, useAuth } from '../providers/AuthContextProvider';
import ThemeSwitcher from '@/components/providers/theme/ThemeSwitcher';
import { Card } from '@/components/ui/shadcn/card';

export const AuthRootLayout: FC<AuthRootLayoutProps> = ({ children }) => {
    const { loading, message, userId } = useAuth();

    return (
        <div className="flex items-center justify-center p-4 min-h-screen" style={{
            background: 'linear-gradient(135deg, var(--background) 0%, var(--accent) 100%)',
            fontFamily: 'Inter, sans-serif'
        }}>
            {loading && (
                <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center p-6 bg-card rounded-radius-lg shadow-xl text-foreground">
                        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-3 text-lg font-semibold">{loading.text}</p>
                    </div>
                </div>
            )}
            <Card className="w-full max-w-sm auth-card">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-primary tracking-tighter">
                        <span className="text-mostafij">TODO</span>Quest
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">Adventure starts here!</p>
                    <ThemeSwitcher />
                </div>

                {userId && (
                    <div className="p-2 text-center text-sm font-mono text-secondary-foreground bg-secondary rounded-radius-sm truncate">
                        Signed In: {userId}
                    </div>
                )}
                {message && (
                    <div className={`p-3 rounded-radius-md text-sm font-medium transition-all duration-300 ${message.type === 'error' ? 'bg-destructive/10 text-destructive' :
                        message.type === 'success' ? 'bg-chart-3/10 text-chart-3' :
                            'bg-accent/10 text-accent-foreground'
                        }`}>
                        {message.text}
                    </div>
                )}
                {children}
            </Card >
        </div>
    );
};

const AuthRootLayoutWithProvider = ({ children }: { children: ReactNode }) => (
    <AuthProvider>
        <AuthRootLayout>{children}</AuthRootLayout>
    </AuthProvider>
);

export default AuthRootLayoutWithProvider;