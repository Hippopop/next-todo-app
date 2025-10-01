import React, { createContext, useContext } from 'react';
import { AuthContextType, AuthProviderProps } from '../types/auth_types';
import { useAuthLogic } from '../hooks/auth_context_hooks';


// Default values for the context (used when context is not provided)
const defaultAuthContext: AuthContextType = {
    userId: null,
    loading: false,
    message: null,
    showMessage: () => { console.error("useAuth must be used within an AuthProvider"); },
    setAuthenticatedUser: () => { console.error("useAuth must be used within an AuthProvider"); },
    setLoadingState: () => { console.error("useAuth must be used within an AuthProvider"); },
};

// --- Context Creation ---
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// --- Auth Provider Component ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // 1. Get the dynamic state values from the logic hook
    const contextValue = useAuthLogic();

    // 2. Pass the values down to the rest of the application
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// --- Context Consumer Hook ---
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === defaultAuthContext) {
        // This check is good practice to ensure the hook is used correctly
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
