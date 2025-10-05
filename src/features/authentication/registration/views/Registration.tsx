"use client";

import { Button } from '@/components/ui/shadcn/button';
import { CardContent, CardFooter } from '@/components/ui/shadcn/card';
import { Field, FieldDescription } from '@/components/ui/shadcn/field';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { ROUTES } from '@/lib/constants/paths';

import { useState } from 'react';

export default function RegistrationPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return (
        <div>
            <CardContent className='my-4'>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Registration
                </Button>
                <Field>
                    <FieldDescription className="text-center">
                        Already have an account? <a href={ROUTES.LOGIN}>Log in</a>
                    </FieldDescription>
                </Field>
            </CardFooter>
        </div>
    );
}