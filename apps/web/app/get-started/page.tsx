"use client";

import { ZipCheck } from "@/components/onboarding/zip-check";
import Link from "next/link";

export default function GetStartedPage() {
    return (
        <main className="flex min-h-screen flex-col bg-zinc-950">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 lg:px-12">
                <Link href="/" className="text-xl font-bold text-white">
                    Backyard Builders
                </Link>
            </header>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center px-6">
                <div className="w-full max-w-md space-y-8 text-center">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-900">
                            1
                        </div>
                        <div className="h-0.5 w-8 bg-zinc-700" />
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-sm text-zinc-500">
                            2
                        </div>
                        <div className="h-0.5 w-8 bg-zinc-700" />
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-sm text-zinc-500">
                            3
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Check Your Area
                        </h1>
                        <p className="mt-3 text-zinc-400">
                            Enter your zip code to see if we serve your area
                        </p>
                    </div>

                    {/* Zip Check Form */}
                    <ZipCheck variant="standalone" />

                    {/* Info */}
                    <p className="text-sm text-zinc-500">
                        We&apos;re currently expanding our service area. If we don&apos;t serve your
                        area yet, you can join our waitlist.
                    </p>
                </div>
            </div>
        </main>
    );
}
