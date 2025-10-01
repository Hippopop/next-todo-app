"use client";

import { Button } from '@/components/ui/shadcn/button';
import { ROUTES } from '@/lib/constants/paths';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function RegistrationPage() {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return (
        <div className="space-y-6">
            <form className="space-y-4">
                <div>
                    <label htmlFor="register-email" className="text-sm font-medium text-foreground/70 block mb-1">Email</label>
                    <input
                        type="email"
                        id="register-email"
                        placeholder="choose-your-tag@quest.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-input rounded-[var(--radius-md)] bg-card text-foreground focus:ring-ring focus:border-ring focus:ring-4 transition duration-150"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="register-password" className="text-sm font-medium text-foreground/70 block mb-1">Password</label>
                    <input
                        type="password"
                        id="register-password"
                        placeholder="set-your-secret-code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-input rounded-[var(--radius-md)] bg-card text-foreground focus:ring-ring focus:border-ring focus:ring-4 transition duration-150"
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label htmlFor="register-confirm-password" className="text-sm font-medium text-foreground/70 block mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="register-confirm-password"
                        placeholder="repeat-the-code"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-input rounded-[var(--radius-md)] bg-card text-foreground focus:ring-ring focus:border-ring focus:ring-4 transition duration-150"
                        required
                    />
                </div>
                <Button className='gamey-btn w-full text-primary-foreground font-bold py-3 rounded-[var(--radius-md)] text-lg shadow-lg'>
                    Start New Quest!
                </Button>
            </form>

            <div className="text-center text-sm">
                <p className="text-muted-foreground">
                    Already an adventurer?{' '}
                    <button
                        onClick={() => {
                            router.push(ROUTES.LOGIN);
                        }}
                        className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
                        type="button"
                    >
                        Return to Login
                    </button>
                </p>
            </div>
        </div>
    );
}