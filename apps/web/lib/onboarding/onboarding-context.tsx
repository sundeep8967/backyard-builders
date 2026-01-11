"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface OnboardingData {
    // Step 0: Zip Code (already captured)
    zipCode: string;

    // Step 1: Personal Info
    firstName: string;
    lastName: string;
    phone: string;

    // Step 2: Property Address
    streetAddress: string;
    unit: string;
    city: string;
    state: string;
    // zip is same as zipCode

    // Step 3: Property Details
    propertyType: string;
    lotSize: string;
}

interface OnboardingContextType {
    data: OnboardingData;
    updateData: (updates: Partial<OnboardingData>) => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    isLoading: boolean;
}

const defaultData: OnboardingData = {
    zipCode: "",
    firstName: "",
    lastName: "",
    phone: "",
    streetAddress: "",
    unit: "",
    city: "",
    state: "",
    propertyType: "single_family",
    lotSize: "",
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const STORAGE_KEY = "onboarding_data";

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<OnboardingData>(defaultData);
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Load from sessionStorage on mount
    useEffect(() => {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        const storedZip = sessionStorage.getItem("onboarding_zip");

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setData(parsed);
                setCurrentStep(parsed.currentStep || 1);
            } catch {
                // Invalid stored data, use defaults
            }
        }

        if (storedZip) {
            setData((prev) => ({ ...prev, zipCode: storedZip }));
        }

        setIsLoading(false);
    }, []);

    // Save to sessionStorage on changes
    useEffect(() => {
        if (!isLoading) {
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ ...data, currentStep })
            );
        }
    }, [data, currentStep, isLoading]);

    const updateData = (updates: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    return (
        <OnboardingContext.Provider
            value={{ data, updateData, currentStep, setCurrentStep, isLoading }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
}
