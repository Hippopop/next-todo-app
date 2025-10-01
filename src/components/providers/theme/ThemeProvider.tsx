'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export const $themeOptions = ['light', 'dark', 'monochrome'];

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return (
        <NextThemesProvider attribute="class" enableSystem themes={$themeOptions}>
            {children}
        </NextThemesProvider>
    );
};

export default ThemeProvider;
