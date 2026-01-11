"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding/onboarding-context";
import { ArrowRight, User, Phone } from "lucide-react";

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[\d\s\-\(\)]+$/, "Invalid phone number format"),
});

type FormData = z.infer<typeof schema>;

interface StepPersonalInfoProps {
    onNext: () => void;
}

export function StepPersonalInfo({ onNext }: StepPersonalInfoProps) {
    const { data, updateData } = useOnboarding();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
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
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300">
                        First Name
                    </label>
                    <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                        <input
                            {...register("firstName")}
                            type="text"
                            placeholder="John"
                            className={`w-full rounded-lg border bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none ${errors.firstName
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-zinc-700 focus:border-zinc-500"
                                }`}
                        />
                    </div>
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300">
                        Last Name
                    </label>
                    <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                        <input
                            {...register("lastName")}
                            type="text"
                            placeholder="Doe"
                            className={`w-full rounded-lg border bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none ${errors.lastName
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-zinc-700 focus:border-zinc-500"
                                }`}
                        />
                    </div>
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300">
                        Phone Number
                    </label>
                    <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                        <input
                            {...register("phone")}
                            type="tel"
                            placeholder="(555) 123-4567"
                            className={`w-full rounded-lg border bg-zinc-900 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none ${errors.phone
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-zinc-700 focus:border-zinc-500"
                                }`}
                        />
                    </div>
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                disabled={!isValid}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100 disabled:bg-zinc-700 disabled:text-zinc-400"
            >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </form>
    );
}
