
"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import {
    User,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth as getAuth, googleProvider as getGoogleProvider } from "@/lib/firebase/client";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    isDemoMode: boolean;
    role: "admin" | "customer";
    toggleAdminMode: () => void; // Quick hack for demo purposes
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<"admin" | "customer">("customer");

    // Check if Firebase is properly configured
    const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "your-api-key";

    useEffect(() => {
        if (isDemoMode) {
            // Demo mode: simulate logged in user
            setUser({
                uid: "demo-user-123",
                email: "demo@example.com",
                displayName: "Demo User",
                photoURL: null,
            } as User);
            setLoading(false);
            return;
        }

        const auth = getAuth();
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);

            // In a real app, we would fetch the role from the backend here
            // const { role } = await fetchUserRole(user.uid);
            // setRole(role);
        });

        return () => unsubscribe();
    }, [isDemoMode]);

    const signInWithGoogle = async () => {
        if (isDemoMode) {
            // Demo mode: just set demo user
            setUser({
                uid: "demo-user-123",
                email: "demo@example.com",
                displayName: "Demo User",
                photoURL: null,
            } as User);
            return;
        }

        const auth = getAuth();
        const googleProvider = getGoogleProvider();

        if (!auth || !googleProvider) {
            console.error("Firebase not initialized");
            return;
        }

        try {
            const result = await signInWithPopup(auth, googleProvider);

            // Sync user to Supabase
            const token = await result.user.getIdToken();
            await fetch("/api/auth/sync", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Sign in error:", error);
            throw error;
        }
    };

    const signOut = async () => {
        setRole("customer"); // Reset role on sign out
        if (isDemoMode) {
            setUser(null);
            return;
        }

        const auth = getAuth();
        if (!auth) return;

        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    };

    const toggleAdminMode = () => {
        setRole(prev => prev === "admin" ? "customer" : "admin");
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, signInWithGoogle, signOut, isDemoMode, role, toggleAdminMode }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

