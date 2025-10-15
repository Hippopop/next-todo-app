import ThemeProvider from "@/components/providers/theme/ThemeProvider"
import ReduxStoreProvider from "@/lib/redux/StoreProvider"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <body>
                <ReduxStoreProvider>
                    <ThemeProvider> {children} </ThemeProvider>
                </ReduxStoreProvider>
            </body>
        </html>
    )
}