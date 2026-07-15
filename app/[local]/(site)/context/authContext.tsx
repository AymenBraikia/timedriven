// context/AuthContext.tsx (Client Component)
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Session = { name: string | null } | null;

const AuthContext = createContext<{
    session: Session;
    setSession: (session: Session) => void;
}>({ session: null, setSession: () => {} });

export function AuthProvider({ children, initialSession }: { children: React.ReactNode; initialSession: Session }) {
    const [session, setSession] = useState<Session>(initialSession);

    useEffect(() => {
        setSession(initialSession);
    }, [initialSession]);

    return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
