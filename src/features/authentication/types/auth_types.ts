
export interface Message {
    type: 'success' | 'error' | 'info';
    text: string;
}


export interface AuthContextType {
    userId: string | null;
    loading: { text: string } | false;
    message: Message | null;
    showMessage: (type: Message['type'], text: string) => void;
    setAuthenticatedUser: (id: string | null) => void;
    setLoadingState: (show: boolean, text?: string) => void;
}

/** Properties for the main AuthProvider component. */
export interface AuthProviderProps {
    children: React.ReactNode;
}

/** Properties for the top-level visual layout component (if used). */
export interface AuthRootLayoutProps {
    children: React.ReactNode;
}
