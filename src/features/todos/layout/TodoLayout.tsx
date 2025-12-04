import TopNavigationBar from '@/components/custom/TopNavigationBar';

interface TodoLayoutProps {
    children: React.ReactNode;
}

export default function TodoLayout({ children }: TodoLayoutProps) {
    return (
        <div>
            <TopNavigationBar />
            <div className="absolute top-0 left-0 w-full h-full bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    {children}
                </div>
            </div>
        </div>
    );
};