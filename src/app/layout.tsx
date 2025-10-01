import '../styles/globals.css'
import ThemeProvider from '@/components/providers/theme/ThemeProvider'

export const metadata = {
  title: 'TODO App',
  description: 'Created by @Mostafijul Islam',
}

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
