"use client";

import { ZipCheck } from "@/components/onboarding/zip-check";
import Link from "next/link";

export default function GetStartedPage() {
    return (
        <main className="flex min-h-screen flex-col bg-white">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 lg:px-12 border-b border-zinc-100">
                <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
                    Dream Home Constructors
                </Link>
                <Link
                    href="/sign-in"
                    className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                    Sign In
                </Link>
            </header>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center px-6">
                <div className="w-full max-w-md space-y-8 text-center">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                            1
                        </div>
                        <div className="h-0.5 w-8 bg-zinc-200" />
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm text-zinc-400">
                            2
                        </div>
                        <div className="h-0.5 w-8 bg-zinc-200" />
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm text-zinc-400">
                            3
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">
                            Check Your Area
                        </h1>
                        <p className="mt-3 text-zinc-500">
                            Enter your zip code to see if we serve your area
                        </p>
                    </div>

                    {/* Zip Check Form */}
                    <ZipCheck variant="standalone" />

                    {/* Info */}
                    <div className="space-y-4">
                        <p className="text-sm text-zinc-400">
                            We&apos;re currently expanding our service area. If we don&apos;t serve your
                            area yet, you can join our waitlist.
                        </p>
                        <p className="text-sm text-zinc-500">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="font-medium text-zinc-900 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
