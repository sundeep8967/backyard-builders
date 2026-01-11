"use client";

import Link from "next/link";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding/onboarding-context";
import { StepPersonalInfo } from "@/components/onboarding/step-personal-info";
import { StepPropertyAddress } from "@/components/onboarding/step-property-address";
import { StepConfirm } from "@/components/onboarding/step-confirm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const STEPS = [
    { number: 1, title: "Your Info" },
    { number: 2, title: "Property" },
    { number: 3, title: "Confirm" },
];

function OnboardingContent() {
    const { currentStep, setCurrentStep, data, isLoading } = useOnboarding();
    const router = useRouter();

    // Redirect if no zip code
    useEffect(() => {
        if (!isLoading && !data.zipCode) {
            router.push("/get-started");
        }
    }, [isLoading, data.zipCode, router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
            </div>
        );
    }

    const handleNext = () => setCurrentStep(currentStep + 1);
    const handleBack = () => setCurrentStep(currentStep - 1);

    return (
        <main className="flex min-h-screen flex-col bg-zinc-950">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 lg:px-12">
                <Link href="/" className="text-xl font-bold text-white">
                    Backyard Builders
                </Link>
            </header>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center px-6 py-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center">
                        {STEPS.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${currentStep > step.number
                                                ? "bg-green-500 text-white"
                                                : currentStep === step.number
                                                    ? "bg-white text-zinc-900"
                                                    : "bg-zinc-800 text-zinc-500"
                                            }`}
                                    >
                                        {currentStep > step.number ? "✓" : step.number}
                                    </div>
                                    <span
                                        className={`mt-2 text-xs ${currentStep >= step.number
                                                ? "text-zinc-300"
                                                : "text-zinc-600"
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div
                                        className={`mx-2 h-0.5 w-12 ${currentStep > step.number ? "bg-green-500" : "bg-zinc-700"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Title */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white">
                            {currentStep === 1 && "Tell us about yourself"}
                            {currentStep === 2 && "Property location"}
                            {currentStep === 3 && "Confirm details"}
                        </h1>
                        <p className="mt-2 text-zinc-400">
                            {currentStep === 1 && "We'll use this to personalize your experience"}
                            {currentStep === 2 && "Enter the address of your property"}
                            {currentStep === 3 && "Review your information before proceeding"}
                        </p>
                    </div>

                    {/* Step Content */}
                    {currentStep === 1 && <StepPersonalInfo onNext={handleNext} />}
                    {currentStep === 2 && (
                        <StepPropertyAddress onNext={handleNext} onBack={handleBack} />
                    )}
                    {currentStep === 3 && <StepConfirm onBack={handleBack} />}
                </div>
            </div>
        </main>
    );
}

export default function OnboardingPage() {
    return (
        <OnboardingProvider>
            <OnboardingContent />
        </OnboardingProvider>
    );
}
