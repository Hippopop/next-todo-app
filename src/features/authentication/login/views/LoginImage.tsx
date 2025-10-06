import React from 'react'
import Image from 'next/image';

export default function LoginImage() {
    return (
        <Image
            priority
            width={500}
            height={500}
            src="/images/login.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    )
}
