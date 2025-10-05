"use client";

import { Button } from '@/components/ui/shadcn/button';
import { ROUTES } from '@/lib/constants/paths';
import { Input } from "@/components/ui/shadcn/input"
import { Label } from "@/components/ui/shadcn/label"
import { CardContent, CardFooter } from "@/components/ui/shadcn/card"

import { useState } from 'react';
import { Field, FieldDescription } from '@/components/ui/shadcn/field';

export default function LoginPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#" //TODO: Add forgot password path here!
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account? <a href={ROUTES.REGISTRATION}>Sign up</a>
                    </FieldDescription>
                </Field>
            </CardFooter>
        </div>
    );
}
