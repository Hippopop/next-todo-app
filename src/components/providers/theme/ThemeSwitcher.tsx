'use client';
import { useTheme } from 'next-themes';
import { $themeOptions } from './ThemeProvider';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const themeIdx = $themeOptions?.indexOf(theme ?? 'light');
    console.log(theme);
    console.log(themeIdx);
    const nextThemeIdx = (themeIdx + 1) % $themeOptions.length;
    return (
        <button
            onClick={() => {
                setTheme($themeOptions[nextThemeIdx]);
                console.log(nextThemeIdx);
                console.log($themeOptions[nextThemeIdx]);

            }}
        >
            Switch to {$themeOptions[nextThemeIdx]} mode
        </button>
    );
};

export default ThemeSwitcher;
