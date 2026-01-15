"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormData } from "@/lib/customer/properties";
import { createProperty } from "@/app/actions/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export function AddPropertyForm() {
    const [state, formAction] = useActionState(createProperty, {});
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            state: "AZ",
        },
    });

    // Handle server-side errors
    useEffect(() => {
        if (state.errors) {
            Object.entries(state.errors).forEach(([key, messages]) => {
                if (messages && messages.length > 0) {
                    setError(key as keyof PropertyFormData, {
                        type: "server",
                        message: messages[0],
                    });
                }
            });
        }
    }, [state.errors, setError]);

    // Although we use useActionState, integrating with RHF's handleSubmit gives us client-side validation first
    // We need to convert RHF data back to FormData for the server action
    const onSubmit = (data: PropertyFormData) => {
        startTransition(() => {

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value) formData.append(key, value as string);
            });
            formAction(formData);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                {state.message && (
                    <div className={`p-4 rounded-lg text-sm ${state.success === false ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                        {state.message}
                    </div>
                )}

                {/* Nickname */}
                <div className="space-y-2">
                    <Label htmlFor="nickname">Property Nickname (Optional)</Label>
                    <Input
                        id="nickname"
                        placeholder="e.g. Vacation Home"
                        {...register("nickname")}
                        className="bg-zinc-900 border-zinc-700 text-white"
                    />
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <div className="relative">
                        <select
                            id="propertyType"
                            className="flex h-10 w-full rounded-md border border-input bg-zinc-900 border-zinc-700 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                            {...register("propertyType")}
                        >
                            <option value="">Select a type...</option>
                            <option value="single_family">Single Family Home</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="condo">Condo</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                    {errors.propertyType && (
                        <p className="text-sm text-red-500">{errors.propertyType.message}</p>
                    )}
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                        id="streetAddress"
                        placeholder="123 Main St"
                        {...register("streetAddress")}
                        className={`bg-zinc-900 border-zinc-700 text-white ${errors.streetAddress ? "border-red-500" : ""}`}
                    />
                    {errors.streetAddress && (
                        <p className="text-sm text-red-500">{errors.streetAddress.message}</p>
                    )}
                </div>

                {/* Unit */}
                <div className="space-y-2">
                    <Label htmlFor="unit">Unit / Apt (Optional)</Label>
                    <Input
                        id="unit"
                        placeholder="Apt 4B"
                        {...register("unit")}
                        className="bg-zinc-900 border-zinc-700 text-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* City */}
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            placeholder="Phoenix"
                            {...register("city")}
                            className={`bg-zinc-900 border-zinc-700 text-white ${errors.city ? "border-red-500" : ""}`}
                        />
                        {errors.city && (
                            <p className="text-sm text-red-500">{errors.city.message}</p>
                        )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <select
                            id="state"
                            className="flex h-10 w-full rounded-md border border-input bg-zinc-900 border-zinc-700 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                            {...register("state")}
                        >
                            {US_STATES.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="text-sm text-red-500">{errors.state.message}</p>
                        )}
                    </div>
                </div>

                {/* Zip Code */}
                <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                        id="zipCode"
                        placeholder="85001"
                        {...register("zipCode")}
                        className={`bg-zinc-900 border-zinc-700 text-white ${errors.zipCode ? "border-red-500" : ""}`}
                    />
                    {errors.zipCode && (
                        <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                    )}
                    <p className="text-xs text-zinc-500">We currently serve the Greater Phoenix area.</p>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1 border-zinc-700 text-white hover:bg-zinc-800"
                >
                    <Link href="/dashboard">
                        Cancel
                    </Link>
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-white text-zinc-900 hover:bg-zinc-200"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        "Add Property"
                    )}
                </Button>
            </div>
        </form>
    );
}
