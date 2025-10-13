import ThemeProvider from "@/components/providers/theme/ThemeProvider"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}