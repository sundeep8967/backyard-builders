"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getServiceAreaMessage } from "@/lib/service-areas";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";

interface ZipCheckProps {
    variant?: "hero" | "standalone";
    onSuccess?: (zipCode: string) => void;
}

export function ZipCheck({ variant = "standalone", onSuccess }: ZipCheckProps) {
    const [zipCode, setZipCode] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [result, setResult] = useState<{
        isValid: boolean;
        inServiceArea: boolean;
        message: string;
    } | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsChecking(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const checkResult = getServiceAreaMessage(zipCode);
        setResult(checkResult);
        setIsChecking(false);

        if (checkResult.isValid && checkResult.inServiceArea) {
            // Store zip code in sessionStorage for later
            sessionStorage.setItem("onboarding_zip", zipCode);

            if (onSuccess) {
                onSuccess(zipCode);
            } else {
                router.push("/get-started/onboarding");
            }
        } else if (checkResult.isValid && !checkResult.inServiceArea) {
            sessionStorage.setItem("waitlist_zip", zipCode);
            router.push("/waitlist");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 5);
        setZipCode(value);
        setResult(null);
    };

    const isHero = variant === "hero";

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div
                className={`flex ${isHero ? "flex-col sm:flex-row" : "flex-col"
                    } gap-3`}
            >
                <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter your zip code"
                        value={zipCode}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition-colors focus:outline-none ${result && !result.isValid
                            ? "border-red-500 focus:border-red-500"
                            : result && result.inServiceArea
                                ? "border-green-500 focus:border-green-500"
                                : "border-zinc-700 focus:border-zinc-500"
                            }`}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={zipCode.length !== 5 || isChecking}
                    className={`${isHero ? "sm:w-auto" : "w-full"
                        } bg-white text-zinc-900 hover:bg-zinc-100 disabled:bg-zinc-700 disabled:text-zinc-400`}
                >
                    {isChecking ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            Check Availability
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>

            {/* Result Message */}
            {result && (
                <p
                    className={`mt-3 text-sm ${result.inServiceArea
                        ? "text-green-400"
                        : result.isValid
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                >
                    {result.message}
                </p>
            )}
        </form>
    );
}
