import { useState, useEffect } from 'react';
import { AuthContextType, Message } from '../types/auth_types';


export const useAuthLogic = (): AuthContextType => {
    const [loading, setLoading] = useState<AuthContextType['loading']>(false);
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
        console.log("Auth Logic initialized. User ID check simulated.");
        setLoadingState(true, "Checking session...");
        
        setTimeout(() => {
            setUserId(null);
            setLoadingState(false);
            console.log("Session check complete.");
        }, 500);
    }, []);

    return { userId, loading, message, showMessage, setAuthenticatedUser, setLoadingState };
};
