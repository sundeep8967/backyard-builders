"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
    const { user, loading, signInWithGoogle, role, toggleAdminMode } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If logged in and IS admin, go to dashboard
        if (!loading && user && role === 'admin') {
            router.push("/admin/dashboard");
        }
        // If logged in but NOT admin (and not loading), maybe warn or auto-switch for demo
        else if (!loading && user && role !== 'admin') {
            // For demo convenience, we might just sign them out or show "Unauthorized"
            // implementation detail: user needs to be 'admin'
        }
    }, [user, loading, role, router]);

    const handleAdminLogin = async () => {
        // 1. Ensure we are in 'admin' mode for the demo context
        if (role !== 'admin') {
            toggleAdminMode();
        }
        // 2. Perform sign in
        await signInWithGoogle();
        // 3. Router redirect is handled by useEffect or promise resolution
        router.push("/admin/dashboard");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6">
            <div className="w-full max-w-md space-y-8">
                {/* Admin Logo */}
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm">
                        <ShieldAlert className="h-6 w-6 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Dream Home Constructors</h1>
                    <p className="mt-1 text-sm font-medium text-zinc-500 uppercase tracking-wider">Admin Portal</p>
                    <p className="mt-4 text-xs text-zinc-400">
                        Restricted access for authorized personnel only.
                    </p>
                </div>

                {/* Sign In Card */}
                <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
                    <div className="space-y-4">
                        <button
                            onClick={handleAdminLogin}
                            className="flex w-full items-center justify-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Sign in as Administrator
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
