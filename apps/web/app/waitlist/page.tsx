"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function WaitlistPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In production, you'd save this to your database
        console.log("Waitlist signup:", {
            email,
            zipCode: sessionStorage.getItem("waitlist_zip"),
        });

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6">
                <div className="w-full max-w-md space-y-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">You&apos;re on the list!</h1>
                    <p className="text-zinc-400">
                        We&apos;ll notify you as soon as we expand to your area. Thanks for your
                        interest in Backyard Builders!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                    </Link>
                </div>
            </main>
        );
    }

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
                    {/* Icon */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20">
                        <Mail className="h-8 w-8 text-amber-400" />
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            We&apos;re Not There Yet
                        </h1>
                        <p className="mt-3 text-zinc-400">
                            We don&apos;t currently serve your area, but we&apos;re expanding fast.
                            Join our waitlist to be notified when we arrive!
                        </p>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting || !email}
                            className="w-full bg-white text-zinc-900 hover:bg-zinc-100"
                        >
                            {isSubmitting ? "Joining..." : "Join Waitlist"}
                        </Button>
                    </form>

                    {/* Back Link */}
                    <Link
                        href="/get-started"
                        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Try a different zip code
                    </Link>
                </div>
            </div>
        </main>
    );
}
