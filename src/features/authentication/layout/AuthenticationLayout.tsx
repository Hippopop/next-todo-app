import { Card, CardContent } from '@/components/shadcn/card';
import { FieldDescription } from '@/components/shadcn/field';
import TopNavigationBar from '@/components/custom/TopNavigationBar';

interface AuthRootLayoutProps {
    children: React.ReactNode;
    image: React.ReactNode;
}

export default function AuthRootLayout({ children, image }: AuthRootLayoutProps) {
    return (
        <div>
            <TopNavigationBar />
            <div className="absolute top-0 left-0 w-full h-full bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <div className={"flex flex-col gap-6"}>
                        <Card className="overflow-hidden p-0 auth-card">
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