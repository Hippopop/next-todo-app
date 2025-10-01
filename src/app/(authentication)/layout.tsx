"use client";

import React, { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';

// --- 1. Type Definitions (Minimal) ---

interface Message {
    type: 'success' | 'error' | 'info';
    text: string;
}

interface BackendContext {
    userId: string | null;
    loading: { text: string } | false;
    message: Message | null;
    showMessage: (type: Message['type'], text: string) => void;
    // Function to be called by your login/register component upon success/failure
    setAuthenticatedUser: (id: string | null) => void; 
    setLoadingState: (show: boolean, text?: string) => void;
}

const defaultAuthContext: BackendContext = {
    userId: null,
    loading: false,
    message: null,
    showMessage: () => { console.warn("Context not provided"); },
    setAuthenticatedUser: () => { console.warn("Context not provided"); },
    setLoadingState: () => { console.warn("Context not provided"); },
};

const AuthContext = createContext<BackendContext>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}


// --- 2. Backend Context Hook (for state management) ---

const useBackendContext = (): BackendContext => {
    const [loading, setLoading] = useState<BackendContext['loading']>(false);
    const [message, setMessage] = useState<Message | null>(null);
    const [userId, setUserId] = useState<string | null>(null); 

    const setLoadingState = (show: boolean, text: string = "Processing...") => {
        setLoading(show ? { text } : false);
    };

    const showMessage = (type: Message['type'], text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const setAuthenticatedUser = (id: string | null) => {
        setUserId(id);
    };
    
    // Placeholder for initial authentication check (e.g., token verification)
    useEffect(() => {
        console.log("Auth Layout ready. User ID check simulated.");
        setTimeout(() => {
            setUserId(null); 
        }, 500);
    }, []);

    return { userId, loading, message, showMessage, setAuthenticatedUser, setLoadingState };
};


// --- 3. Auth Provider ---

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const contextValue = useBackendContext();
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


// --- 4. Main Auth Root Layout Component (Visual Container) ---

interface AuthRootLayoutProps {
    children: ReactNode;
}

/**
 * Provides the visual wrapper, shared aesthetics, and global context for authentication pages.
 */
export const AuthRootLayout: FC<AuthRootLayoutProps> = ({ children }) => {
    const { loading, message, userId } = useAuth();

    return (
        <div className="flex items-center justify-center p-4 min-h-screen" style={{
            background: 'linear-gradient(135deg, var(--background) 0%, var(--accent) 100%)', 
            fontFamily: 'Inter, sans-serif'
        }}>
            <style jsx global>{`
                /* Custom CSS based on your config for the "gamey" aesthetic */
                .auth-card {
                    /* Shadow using primary color for glow */
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px var(--color-primary); 
                    border-radius: var(--radius-xl);
                }
                .auth-card:hover {
                    transform: translateY(-5px);
                    /* Shadow using accent color for hover glow */
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3), 0 0 25px var(--color-accent);
                }
                .gamey-btn {
                    /* Gradient using primary and secondary colors */
                    background-image: linear-gradient(to right, var(--color-primary) 0%, var(--color-secondary) 100%);
                    transition: all 0.2s ease-in-out;
                    transform: scale(1);
                    border-radius: var(--radius-md);
                }
                .gamey-btn:hover {
                    box-shadow: 0 4px 15px var(--color-primary); 
                    transform: scale(1.05);
                }
                .gamey-btn:active {
                    transform: scale(0.98);
                }
                /* Custom property aliases for Tailwind classes */
                .rounded-radius-md { border-radius: var(--radius-md); }
                .rounded-radius-lg { border-radius: var(--radius-lg); }
                .rounded-radius-xl { border-radius: var(--radius-xl); }
                .rounded-radius-sm { border-radius: var(--radius-sm); }
            `}</style>
            
            {/* Loading Indicator Modal */}
            {loading && (
                <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center p-6 bg-card rounded-radius-lg shadow-xl text-foreground">
                        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-3 text-lg font-semibold">{loading.text}</p>
                    </div>
                </div>
            )}

            {/* Main Auth Card Container */}
            <div className="w-full max-w-md bg-card p-8 space-y-6 rounded-radius-xl transition-all duration-300 auth-card">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-primary tracking-tighter">
                        <span className="text-mostafij">TODO</span>Quest
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">Adventure starts here!</p>
                </div>
                
                {/* Display Current User ID (for debugging/identification) */}
                 {userId && (
                    <div className="p-2 text-center text-sm font-mono text-secondary-foreground bg-secondary rounded-radius-sm truncate">
                        Signed In: {userId}
                    </div>
                )}

                {/* Error/Success Message Box */}
                {message && (
                    <div className={`p-3 rounded-radius-md text-sm font-medium transition-all duration-300 ${
                        message.type === 'error' ? 'bg-destructive/10 text-destructive' :
                        message.type === 'success' ? 'bg-chart-3/10 text-chart-3' :
                        'bg-accent/10 text-accent-foreground'
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Placeholder for Routed Content (Login/Register Forms) */}
                {children}
            </div>
        </div>
    );
};

// Wrap the AuthLayout export with AuthProvider for correct context setup
const AuthRootLayoutWithProvider = ({ children }: { children: ReactNode }) => (
    <AuthProvider>
        <AuthRootLayout>{children}</AuthRootLayout>
    </AuthProvider>
);

export default AuthRootLayoutWithProvider;
