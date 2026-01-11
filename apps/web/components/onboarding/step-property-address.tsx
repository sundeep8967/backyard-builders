"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding/onboarding-context";
import { ArrowRight, ArrowLeft, MapPin, Building } from "lucide-react";

const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const schema = z.object({
    streetAddress: z.string().min(5, "Street address is required"),
    unit: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
});

type FormData = z.infer<typeof schema>;

interface StepPropertyAddressProps {
    onNext: () => void;
    onBack: () => void;
}

export function StepPropertyAddress({ onNext, onBack }: StepPropertyAddressProps) {
    const { data, updateData } = useOnboarding();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            streetAddress: data.streetAddress,
            unit: data.unit,
            city: data.city,
            state: data.state || "AZ",
        },
        mode: "onChange",
    });

    const onSubmit = (formData: FormData) => {
        updateData(formData);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                {/* Street Address */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300">
                        Street Address
                    </label>
                    <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                        <input
                            {...register("streetAddress")}
                            type="text"
                            placeholder="123 Main Street"
                            className={`w-full rounded-lg border bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none ${errors.streetAddress
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-zinc-700 focus:border-zinc-500"
                                }`}
                        />
                    </div>
                    {errors.streetAddress && (
                        <p className="mt-1 text-sm text-red-400">{errors.streetAddress.message}</p>
                    )}
                </div>

                {/* Unit */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300">
                        Unit / Apt (optional)
                    </label>
                    <div className="relative mt-1">
                        <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                        <input
                            {...register("unit")}
                            type="text"
                            placeholder="Apt 4B"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* City and State Row */}
                <div className="grid grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300">
                            City
                        </label>
                        <input
                            {...register("city")}
                            type="text"
                            placeholder="Phoenix"
                            className={`mt-1 w-full rounded-lg border bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none ${errors.city
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-zinc-700 focus:border-zinc-500"
                                }`}
                        />
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300">
                            State
                        </label>
                        <select
                            {...register("state")}
                            className={`mt-1 w-full rounded-lg border bg-zinc-900 px-4 py-3 text-white focus:outline-none ${errors.state
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-zinc-700 focus:border-zinc-500"
                                }`}
                        >
                            {US_STATES.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Zip Code (read-only, from earlier step) */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300">
                        Zip Code
                    </label>
                    <input
                        type="text"
                        value={data.zipCode}
                        disabled
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-400"
                    />
                    <p className="mt-1 text-xs text-zinc-500">From your availability check</p>
                </div>
            </div>

            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1 border-zinc-700 text-white hover:bg-zinc-800"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="flex-1 bg-white text-zinc-900 hover:bg-zinc-100 disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
