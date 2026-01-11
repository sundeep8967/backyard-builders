"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding/onboarding-context";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Loader2, User, MapPin, Home } from "lucide-react";

interface StepConfirmProps {
    onBack: () => void;
}

export function StepConfirm({ onBack }: StepConfirmProps) {
    const { data } = useOnboarding();
    const { signInWithGoogle, user, isDemoMode } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleComplete = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Sign in if not already
            if (!user) {
                await signInWithGoogle();
            }

            // In demo mode or real mode, create the property
            // For now, we'll just simulate the API call
            if (isDemoMode) {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Clear onboarding data
                sessionStorage.removeItem("onboarding_data");
                sessionStorage.removeItem("onboarding_zip");

                // Redirect to dashboard
                router.push("/dashboard");
            } else {
                // Real API call would go here
                // const token = await user?.getIdToken();
                // await fetch("/api/properties", {
                //   method: "POST",
                //   headers: { Authorization: `Bearer ${token}` },
                //   body: JSON.stringify(data),
                // });

                sessionStorage.removeItem("onboarding_data");
                sessionStorage.removeItem("onboarding_zip");
                router.push("/dashboard");
            }
        } catch (err) {
            console.error("Error completing onboarding:", err);
            setError("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="space-y-4">
                {/* Personal Info */}
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                            <User className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-400">Your Info</p>
                            <p className="font-medium text-white">
                                {data.firstName} {data.lastName}
                            </p>
                            <p className="text-sm text-zinc-500">{data.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Property Address */}
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                            <MapPin className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-400">Property Address</p>
                            <p className="font-medium text-white">
                                {data.streetAddress}
                                {data.unit && `, ${data.unit}`}
                            </p>
                            <p className="text-sm text-zinc-500">
                                {data.city}, {data.state} {data.zipCode}
                            </p>
                        </div>
                    </div>
                </div>

                {/* What's Next */}
                <div className="rounded-lg border border-green-900/50 bg-green-900/10 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-900/30">
                            <Home className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-green-400">What&apos;s Next</p>
                            <p className="text-sm text-zinc-300">
                                After completing setup, you&apos;ll be able to request estimates for
                                patios, decks, and more!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-center text-sm text-red-400">{error}</p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex-1 border-zinc-700 text-white hover:bg-zinc-800"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button
                    onClick={handleComplete}
                    disabled={isSubmitting}
                    className="flex-1 bg-white text-zinc-900 hover:bg-zinc-100"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Setting up...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Setup
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
