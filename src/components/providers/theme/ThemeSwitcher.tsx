'use client';
import { useTheme } from 'next-themes';
import { $themeOptions } from './ThemeProvider';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { Button } from '@/components/shadcn/button';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Theme</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    {
                        $themeOptions.map(option =>
                        (
                            <DropdownMenuRadioItem key={option} value={option}>
                                {option.toUpperCase()}
                            </DropdownMenuRadioItem>
                        )
                        )
                    }
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};




export default ThemeSwitcher;
