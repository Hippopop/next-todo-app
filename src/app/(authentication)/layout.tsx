import AuthRootLayoutWithProvider from "@/features/authentication/layout/Layout";

import React from 'react'

export default function Layout({ children, image }: { children: React.ReactNode, image: React.ReactNode }) {
    console.log("Image Component: " + image);
    return (
        <AuthRootLayoutWithProvider image={image}> {children} </AuthRootLayoutWithProvider>
    );
}
