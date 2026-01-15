"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
    const { user, loading, signInWithGoogle, isDemoMode, role, toggleAdminMode } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

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
                {/* Logo */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dream Home Constructors</h1>
                    <p className="mt-2 text-zinc-600">
                        Master-crafted custom homes
                    </p>
                </div>

                {/* Demo Mode Banner */}
                {isDemoMode && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center shadow-sm">
                        <p className="text-sm text-amber-700 font-medium">
                            🔧 Demo Mode - Firebase not configured
                        </p>
                        <p className="mt-1 text-xs text-amber-600">
                            Click below to continue with demo data
                        </p>
                    </div>
                )}

                {/* Sign In Card */}
                <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-zinc-900 text-center">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-zinc-500 text-center">
                        Sign in to access your dashboard
                    </p>

                    <div className="mt-8 space-y-4">


                        {/* Google Sign In */}
                        <button
                            onClick={() => {
                                // Ensure we are in customer mode
                                if (role === 'admin') toggleAdminMode();
                                signInWithGoogle();
                            }}

                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 shadow-sm"
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
                            {isDemoMode ? "Continue with Demo" : "Continue with Google"}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-zinc-500">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}
